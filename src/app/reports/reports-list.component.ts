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
                    this.getList('getPOReportList');
                    break;
                case 'so-report':
                    this.getList('getSOReportList');
                    break;
                case 'stock-summary':
                    this.getList('getStockSummaryList');
                    break;
                case 'msl-report':
                    this.getList('getMSLReportList');
                    break;
                case 'sales-register':
                    this.getList('getSalesRegisterList');
                    break;
                case 'grn-register':
                    this.getList('getGRNRegisterList');
                    break;
                case 'stock-issue-register':
                    this.getList('getStockIssueRegisterList');
                    break;

                default:
                    break;
            }
        });
    }

    getList(fName){
        this.reportsList = [];
        this.listData = [];

        var date = new Date();
        var fromDate = '';
        var toDate = '';
        if (localStorage.getItem('r_fromDate') && localStorage.getItem('r_fromDate') !== '') {
            fromDate = JSON.parse(localStorage.getItem('r_fromDate'));
        } else {
            fromDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth(), 1), 'dd/MM/yyyy')
        }
        if (localStorage.getItem('r_toDate') && localStorage.getItem('r_toDate') !== '') {
            toDate = JSON.parse(localStorage.getItem('r_toDate'));
        } else {
            toDate = this.datePipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'dd/MM/yyyy');
        }

        if(this.type=='po-report' || this.type=='so-report'){
            let  ReportsTypeID = 1;
            let StockItemID = 0;
            let LedgerID = 0;
            if (localStorage.getItem('r_reportsTypeID') && localStorage.getItem('r_reportsTypeID') !== '') {
                ReportsTypeID = JSON.parse(localStorage.getItem('r_reportsTypeID'));
            }
            if (localStorage.getItem('r_stockItemID') && localStorage.getItem('r_stockItemID') !== '') {
                StockItemID = JSON.parse(localStorage.getItem('r_stockItemID'));
            }
            if (localStorage.getItem('r_ledgerID') && localStorage.getItem('r_ledgerID') !== '') {
                LedgerID = JSON.parse(localStorage.getItem('r_ledgerID'));
            }
            this.reportsListDataSubscription = this._reportsService[fName](ReportsTypeID,StockItemID,LedgerID,fromDate,toDate).subscribe(
                result => {
                    if (result && result.status === '200')  {
                        this.reportsList = result.data;
                        this.listData = result.data;
                    }
                    this.showLoader = false;
                }
            );
        }

        if(this.type=='stock-summary'){
            let ReportsTypeID = 1;
            let CompanyID = 1;
            if (localStorage.getItem('r_reportsTypeID')  && localStorage.getItem('r_reportsTypeID') !== '') {
                ReportsTypeID = JSON.parse(localStorage.getItem('r_reportsTypeID'));
            }
            this.reportsListDataSubscription = this._reportsService[fName](ReportsTypeID,CompanyID,fromDate,toDate).subscribe(
                result => {
                    if (result && result.status === '200')  {
                        this.reportsList = result.data;
                        this.listData = result.data;
                    }
                    this.showLoader = false;
                },
            );
        }

        if(this.type=='msl-report'){
            let CompanyID = 1;
            this.reportsListDataSubscription = this._reportsService[fName](CompanyID).subscribe(
                result => {
                    if (result && result.status === '200')  {
                        this.reportsList = result.data;
                        this.listData = result.data;
                    }
                    this.showLoader = false;
                },
            );
        }

        if(this.type=='sales-register' || this.type=='grn-register' || this.type=='stock-issue-register'){
            let CompanyID = 1;
            this.reportsListDataSubscription = this._reportsService[fName](CompanyID,fromDate,toDate).subscribe(
                result => {
                    if (result && result.status === '200')  {
                        this.reportsList = result.data;
                        this.listData = result.data;
                    }
                    this.showLoader = false;
                },
            );
        }
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

    convertToDateFormat(Datestr) {
        if (Datestr != '') {
          var datedata = Datestr.split('-');
          // var formatedDateString = new Date(datedata[0] + '-' + datedata[1] + '-' + datedata[2]);
          var formatedDateString = datedata[2] + '/' + datedata[1] + '/' + datedata[0];
          return formatedDateString;
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    exportAsXLSX():void {
       // console.log(this.reportsList);
       for (let index = 0; index < this.reportsList.length; index++) {
           const element = this.reportsList[index];
            if(this.type == 'po-report'){
                element.poDate = this.convertToDateFormat(element.poDate);
            }
            if(this.type == 'so-report'){
                element.soDate = this.convertToDateFormat(element.soDate);
            }
            if(this.type == 'sales-register' || this.type == 'grn-register' || this.type == 'stock-issue-register'){
                element.transactionDate = this.convertToDateFormat(element.transactionDate);
            }
       }
       this.exportAsExcelFile(this.reportsList, this.capitalizeFirstLetter(this.type));
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
