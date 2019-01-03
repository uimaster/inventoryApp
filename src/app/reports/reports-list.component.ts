import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute,Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ReportsService} from './services/reports.service';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-reports-list',
    templateUrl: './reports-list.component.html',
    styleUrls: ['./reports.component.scss']    
})
export class ReportsListComponent implements OnInit, OnDestroy {
    public type:any;
    public reportsList: any;
    public listData: any;
    public showLoader: boolean = false;
    public reportsListDataSubscription: Subscription;


    constructor(
        private _reportsService: ReportsService, 
        private router: Router,
        private _route: ActivatedRoute,
        private datePipe: DatePipe,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.showLoader = true;
        this._route.params.subscribe((params) => {
            this.type = params.type;
            switch (this.type) {
                case 'po-report':
                    this.getPOReportList();
                    break;
            
                default:
                    break;
            }
        });
    }

    getPOReportList(){
       // this.showLoader = true;
        this.reportsList = [];
        this.listData = [];

        var date = new Date();
        var fromDate = '';
        var toDate = '';
        let  ReportsTypeID = 1;
        let StockItemID = 0;
        let LedgerID = 0;

        if (localStorage.getItem('r_fromDate') !== '') {
            fromDate = JSON.parse(localStorage.getItem('r_fromDate'));
        } else {
            fromDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd/MM/yyyy')
        }
        if (localStorage.getItem('r_toDate') !== '') {
            toDate = JSON.parse(localStorage.getItem('r_toDate'));
        } else {
            toDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'dd/MM/yyyy'); 
        }
        if (localStorage.getItem('r_reportsTypeID') !== '') {
            ReportsTypeID = JSON.parse(localStorage.getItem('r_reportsTypeID'));
        }
        if (localStorage.getItem('r_stockItemID') !== '') {
            StockItemID = JSON.parse(localStorage.getItem('r_stockItemID'));
        }
        if (localStorage.getItem('r_ledgerID') !== '') {
            LedgerID = JSON.parse(localStorage.getItem('r_ledgerID'));
        }
        
        this.reportsListDataSubscription = this._reportsService.getPOReportList(ReportsTypeID,StockItemID,LedgerID,fromDate,toDate).subscribe(
            result => {
               // this.showLoader = false;
                if (result && result.status === '200')  {
                    this.reportsList = result.data;
                    this.listData = result.data;
                }
                this.showLoader = false;
            },
            //error => { // this.showLoader = false; }
        );
    }

    set(type,planID){
        this.router.navigate(['/reports/'+type, planID]);
    }

    add(type){
        this.router.navigate(['/reports/add/'+type]);
    }

    ngOnDestroy() {
        if(this.reportsListDataSubscription)
        this.reportsListDataSubscription.unsubscribe();
    }


    applyFilter(filterValue: string){
        this.reportsList = this.listData.filter(
            row => {
                for (var key in row) {
                    if (row.hasOwnProperty(key)) {
                        if(row[key].toString().toLowerCase().includes(filterValue.toLowerCase())){
                            return true;
                        }
                       // console.log(key + " -> " + row[key]);
                    }
                }
            }    
        );
    }

    exportAsXLSX():void {
       console.log(this.reportsList);
       this.exportAsExcelFile(this.reportsList, 'PO-Report');
    }
    
    public exportAsExcelFile(json: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    
}
