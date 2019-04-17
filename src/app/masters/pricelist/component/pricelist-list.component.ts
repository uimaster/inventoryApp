import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute,Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PricelistService} from '../services/pricelist.service';
import {PricelistResponse} from '../models/pricelist.model';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-pricelist-list',
    templateUrl: './pricelist-list.component.html',
    styleUrls: ['./pricelist-list.component.scss']
})
export class PricelistListComponent implements OnInit, OnDestroy {
    public priceList: any;
    public typeID;
    public priceListListDataSubscription: Subscription;
    //public loadingList: boolean = false;
    showLoader = false;
    constructor(
        private priceListService: PricelistService, 
        private router: Router,
        private datePipe: DatePipe,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.showLoader = true;
        this._route.params.subscribe((params) => {
            this.typeID = params.typeID;
            this.getPricelistList();
        });
    }

    getPricelistList() {
        this.showLoader = true;
        this.priceListListDataSubscription = this.priceListService.getAllPricelists(this.typeID,0).subscribe((res: PricelistResponse) => {
            this.showLoader = false;
            if (res && res.status === '200')  {
                this.priceList = res.data;
                // console.log(this.unitList);
            }
        });
    }

    setPricelist(priceListId){
        this.router.navigate(['/masters/pricelist', this.typeID, priceListId]);
    }

    addPricelist(){
        this.router.navigate(['/masters/add-pricelist/',this.typeID]);
    }
    ngOnDestroy() {
        this.priceListListDataSubscription.unsubscribe();
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
        for (let index = 0; index < this.priceList.length; index++) {
           const element = this.priceList[index];
           element.priceListDate = this.convertToDateFormat(element.priceListDate);
        }
       this.exportAsExcelFile(this.priceList, this.capitalizeFirstLetter("price list"));
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
