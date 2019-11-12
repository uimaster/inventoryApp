import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {PricelistService} from '../services/pricelist.service';
import {PricelistResponse} from '../models/pricelist.model';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { NotificationsService } from '../../../notifications/notifications.service';
import { CommonService } from '../../../shared/services/common.services';


@Component({
    selector: 'app-pricelist',
    templateUrl: './pricelist.component.html',
    styleUrls: ['./pricelist.component.scss']
})
export class PricelistComponent implements OnInit, OnDestroy {
    text: string;

    results: string[];
    filteredItems= [];
    showLoader = false;
    public priceListID;
    public typeID:number;
    public ledgerList = [];
    public allStockItems = [];
    public allStockItemsData = [];
    public priceListDataSubscription: Subscription;
   // showError = false;
   // showSuccess = false;
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    constructor(
      private priceListService: PricelistService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private router: Router,
      private datePipe: DatePipe,
      private notificationsService: NotificationsService,
      private commonService: CommonService

    ) { }
    public priceList;
    public cForm;
    date1 = new Date();
    itemName: string;
    showLoad:boolean = false;

    ngOnInit() {
        this.showLoader = true;
        this.getStockItems();

        this.priceListForm();

      //setTimeout(() => {
        this._route.params.subscribe((params) => {
          this.priceListID = params.id;
          this.typeID = params.typeID;
          this.getLedgers();
          //this.getPricelistData(this.priceListID);
        });
      //}, 4000);
      this.cForm.get('ledgerID').valueChanges
      .subscribe(selected => {
          if (selected != '') {
              this.showLoad = true;
          }
          else {
              this.showLoad = false;
          }
      });
    }

    back(url){
      this.commonService.getNavigate(url);
    }


    getPricelistData(priceListId) {
        //this.showLoader = true;
        this.priceListDataSubscription = this.priceListService.getPricelistData(this.priceListID).subscribe((res: PricelistResponse) => {
            this.priceList = res.data[0];
            if (this.priceListID && this.priceList) {
                var parts = this.priceList['priceListDate'].split("-");
                let priceListDate = new Date(parts[2], parts[1] - 1, parts[0]);

                this.cForm.controls['priceListID'].setValue(this.priceList['priceListID']);
                this.cForm.controls['priceListDate'].setValue(priceListDate);
                this.cForm.controls['ledgerID'].setValue(this.priceList['ledgerID']);
                this.cForm.controls['companyID'].setValue(this.priceList['companyID']);
                //this.cForm.controls['itemCount'].setValue(this.priceList['itemCount']);
                this.cForm.controls['priceListTypeID'].setValue(this.priceList['priceListTypeID']);
                if (this.priceList['priceListItems'].length > 0) {
                    // const controlArray = <FormArray> this.cForm.get('priceListItems');
                    // controlArray.removeAt(0);
                    // this.priceList['priceListItems'].forEach(row => controlArray.push(this._formBuilder.group(row)));
                    this.cForm.setControl('priceListItems', this._formBuilder.array((this.priceList['priceListItems'] || []).map((x) => this._formBuilder.group(x))));
                }
            }
           // this.showLoader = false;
        });
    }

    priceListForm() {
      this.cForm = this._formBuilder.group({
          priceListID: [0],
          priceListDate: ['', [Validators.required]],
          companyID: [JSON.parse(this.companyId)],
          ledgerID: [0, Validators.required],
         // itemCount: [0, Validators.required],
          priceListTypeID: [this.typeID],
          priceListItems:  this._formBuilder.array([this.createpriceListItems()]),
      });
    }

    get priceListDate() { return this.cForm.get('priceListDate'); }
    get ledgerID() { return this.cForm.get('ledgerID'); }

    createpriceListItems() {
        return this._formBuilder.group({
            stockItemID: [0],
            itemName:[''],
            //itemSerialNo: [0],
            itemRate: [0],
            stopsRate: [0],
            lengthRate: [0],
            discountPercentage: [0]
        });
    }

    addItems() {
      const stockItemArray = <FormArray>this.cForm.get('priceListItems');
      stockItemArray.push(
        this._formBuilder.group({
            stockItemID: [0],
            itemName:'',
           // itemSerialNo: [0],
            itemRate: [0],
            stopsRate: [0],
            lengthRate: [0],
            discountPercentage: [0]
        })
      );
    }

    removeItems(index) {
      const stockItemArray = <FormArray>this.cForm.get('priceListItems');
      stockItemArray.removeAt(index);
    }

    ngOnDestroy() {
        this.priceListDataSubscription.unsubscribe();
    }


    savePricelist (form: any) {
        //console.log(form);
        //console.log(this.cForm.getRawValue());
        // for (let index = 0; index < form.priceListItems.length; index++) {
        //     const element = form.priceListItems[index];
        //     element.itemSerialNo = index+1;
        // }
       // console.log(form);
        form.priceListTypeID = Number(this.typeID);
        form.priceListDate = this.datePipe.transform(form.priceListDate, 'yyyy-MM-dd');
        this.priceListService.updatePricelist(form).subscribe((res: PricelistResponse) => {
            if (res.status === '200') {
                //this.showSuccess = true;
                this.notificationsService.notify('success','Success','You have Updated/created successfully.');
                setTimeout(() => {
                  this.router.navigate(['/masters/pricelist',this.typeID]);
                }, 3000);
            } 
            else if(res.status === '500') {
              // this.showError = true;
              this.notificationsService.notify('error','Error',res.message)
            }
            else {
             // this.showError = true;
              this.notificationsService.notify('error','Error','Updatation/creation failed.')
            }
        });
    }

    getLedgers() {

      if(this.typeID==1){
        this.priceListService.getAllSuppliers().subscribe( res => {
        if (res && res.status === '200') {
          // this.ledgerList = res.data;
          let data = res.data;
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
                this.ledgerList.push({label: data[key].supplierName, value: data[key].supplier_ID});
            }
          }
        }
        });
      }
      else if(this.typeID==2){
        this.priceListService.getAllCustomers().subscribe( res => {
          if (res && res.status === '200') {
            // this.ledgerList = res.data;
            let data = res.data;
            for (let key in data) {
              if (data.hasOwnProperty(key)) {
                  this.ledgerList.push({label: data[key].customerName, value: data[key].customer_ID});
              }
            }
          }
        });
      }
    }

    getStockItems() {
        this.priceListService.getAllStocks().subscribe( res => {
            if (res && res.status === '200') {
                //this.allStockItems = res.data;
                // this.itemMasterList = res.data;
                let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.allStockItems.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
                        //this.allStockItemsData.push({label: data[key].itemName, value: data[key].stockItemID});
                    }
                }
            }
            this.getPricelistData(this.priceListID);
            this.showLoader = false;
        });
    }


    search(event) {
        this.allStockItems = this.allStockItemsData.filter(
            row => {
                for (var key in row) {
                    if (row.hasOwnProperty(key)) {
                        if(row[key].toString().toLowerCase().includes(event.query.toLowerCase())){
                            return true;
                        }
                       // console.log(key + " -> " + row[key]);
                    }
                }
            }
        );
    }

    filterItems(event) {
        this.filteredItems = [];
        for (let i = 0; i < this.allStockItems.length; i++) {
            let itemName = this.allStockItems[i].label;
            if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredItems.push(itemName);
            }
        }
    }

    getSelectedVal(event, elem,index) {
      for ( var i = 0; i < this.allStockItems.length; i++) {
        if (this.allStockItems[i].label === event) {
          this.cForm.get(elem).controls[index].get('stockItemID').setValue(this.allStockItems[i].value);
        }
      }
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
        // for (let index = 0; index < this.priceList['priceListItems'].length; index++) {
        //    const element = this.priceList[index];
        //    element.priceListDate = this.convertToDateFormat(element.priceListDate);
        // }
       this.exportAsExcelFile(this.priceList['priceListItems'], this.capitalizeFirstLetter("price list"));
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
