import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BomService} from '../services/bom.service';
import {BomResponse} from '../models/bom.model';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-bom-list',
    templateUrl: './bom-list.component.html',
    styleUrls: ['./bom-list.component.scss']
})
export class BomListComponent implements OnInit, OnDestroy {
    public bomList: any;
    public listData: any;
    public showLoader:boolean = false;
    public bomListDataSubscription: Subscription;
    constructor(private bomService: BomService, private router: Router,private datePipe: DatePipe) { }

    ngOnInit() {
        this.getBomList();
    }

    getBomList() {
        this.showLoader = true;
        this.bomListDataSubscription = this.bomService.getAllBoms().subscribe((res: BomResponse) => {
            this.showLoader = false;
            if (res && res.status === '200')  {
                this.bomList = res.data;
                this.listData = res.data;
                // console.log(this.unitList);
            }
        });
    }


    setBom(bomId){
        this.router.navigate(['/bill-material/bom', bomId]);
    }

    addBom(){
        this.router.navigate(['/bill-material/add-bom']);
    }
    ngOnDestroy() {
        this.bomListDataSubscription.unsubscribe();
    }


    applyFilter(filterValue: string){
        this.bomList = this.listData.filter(
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
    formatDate(dateStr){
        if(dateStr){
            let myDate = dateStr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
            return this.datePipe.transform(myDate, 'dd/MM/yyyy', 'es-ES');
        }        
    }

    exportAsXLSX():void {
       // console.log(this.reportsList);
       for (let index = 0; index < this.bomList.length; index++) {
           const element = this.bomList[index];
           element.bomDate = this.convertToDateFormat(element.bomDate);
       }
       this.exportAsExcelFile(this.bomList, this.capitalizeFirstLetter('Bill Of Material'));
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
