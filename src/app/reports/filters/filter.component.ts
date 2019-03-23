import { Component, OnInit, OnDestroy,ViewEncapsulation } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location,DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FiltersComponent implements OnInit, OnDestroy {
  public dateValue1 = new Date();
  public dateValue2 = new Date();
  public fromDate = '';
  public toDate = '';
  public currentUrl = '';
  public selectedReportType = 1;
  public reportTypeList = [ {label: 'All', value: 1}, {label: 'Pending List', value: 2}];
  public SSreportTypeList = [ {label: 'Raw Materials', value: 1}, {label: 'Finished Goods', value: 2}];
  public stockItemList = [];
  public filteredItems = [];
  public ledgerList = [];
  public ledgerID = 0;
  //public ledgerName = '';
  public stockItemID = 0;
  public stockItemName = '';
  public type:any;
  //public ledger = [];

  constructor(
      private reportsService: ReportsService,
      private router: Router,
      private location: Location,
      private datePipe: DatePipe,
      private _route: ActivatedRoute,) {
    this.currentUrl = window.location.href;
  }

  ngOnDestroy() {
    if (window.location.href !== this.currentUrl) {
      localStorage.removeItem('r_fromDate');
      localStorage.removeItem('r_toDate');
      localStorage.removeItem('r_reportsTypeID');
      localStorage.removeItem('r_stockItemID');
      localStorage.removeItem('r_ledgerID');
      // localStorage.removeItem('r_ledgerName');
    }
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
        //console.log('params',params);
        this.type = params.type;
        switch (this.type) {
            case 'po-report':
                this.getLedgers('getAllSuppliers');
                break;
            case 'so-report':
                this.getLedgers('getAllCustomers');
                break;

            default:
                break;
        }
        if(this.type=='po-report' || this.type=='so-report'){
            this.getStockItemList();
            if (localStorage.getItem('r_stockItemID')) { this.stockItemID = JSON.parse(localStorage.getItem('r_stockItemID'));}
            else{ localStorage.setItem('r_stockItemID', JSON.stringify(this.stockItemID)); }
            if (localStorage.getItem('r_stockItemName')) { this.stockItemName = JSON.parse(localStorage.getItem('r_stockItemName')); }
            else{ localStorage.setItem('r_stockItemName', JSON.stringify(this.stockItemName)); }
        }
    });

    var date = new Date();
    if (localStorage.getItem('r_fromDate')) { this.dateValue1 = JSON.parse(localStorage.getItem('r_fromDate')); }
    else{
        this.dateValue1 = new Date(date.getFullYear(), date.getMonth(), 1);
        let fromDate = this.datePipe.transform(this.dateValue1, 'dd/MM/yyyy');
        localStorage.setItem('r_fromDate', JSON.stringify(fromDate)); }

    if (localStorage.getItem('r_toDate')) { this.dateValue2 = JSON.parse(localStorage.getItem('r_toDate')); }
    else{
        this.dateValue2 =  new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let toDate = this.datePipe.transform(this.dateValue2, 'dd/MM/yyyy');
        localStorage.setItem('r_toDate', JSON.stringify(toDate)); }

    if (localStorage.getItem('r_reportsTypeID')) { this.selectedReportType = JSON.parse(localStorage.getItem('r_reportsTypeID')); }
    else{ localStorage.setItem('r_reportsTypeID', JSON.stringify(this.selectedReportType)); }

    //if(localStorage.getItem('r_ledgerID')){  this.ledgerID = JSON.parse(localStorage.getItem('r_ledgerID')); }
    //else{ localStorage.setItem('r_ledgerID', JSON.stringify(this.ledgerID)); }
    //if(localStorage.getItem('r_ledgerName')){  this.ledgerName = JSON.parse(localStorage.getItem('r_ledgerName')); }
    //else{ localStorage.setItem('r_ledgerName', JSON.stringify(this.ledgerName)); }
  }

  convertDate(data) {
    const date = new Date(data);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let newDate = day + '/' + month + '/' + year;
    return newDate;
  }

  getFromDate(event) {
    const date = this.convertDate(event);
    localStorage.setItem('r_fromDate', JSON.stringify(date));
  }

  getToDate(event) {
    const date = this.convertDate(event);
    localStorage.setItem('r_toDate', JSON.stringify(date));
  }

  onChangeReportType(){
    localStorage.setItem('r_reportsTypeID', JSON.stringify(this.selectedReportType));
  }

  getTransactionList() {

    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; };

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  getStockItemList(){
    this.reportsService.getStockItemList().subscribe(
        result => {
            if (result && result.status === '200')  {
                let data = result.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.stockItemList.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
                    }
                }
            }
        },
    );
  }

  filterItems(event) {
    this.filteredItems = [];
    for (let i = 0; i < this.stockItemList.length; i++) {
        let itemName = this.stockItemList[i].label;
        if (itemName.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredItems.push(itemName);
        }
    }
  }

  getStockItem(event) {
    for ( var i = 0; i < this.stockItemList.length; i++) {
        if (this.stockItemList[i].label === event) {
            localStorage.setItem('r_stockItemID', JSON.stringify(this.stockItemList[i].value));
            localStorage.setItem('r_stockItemName', JSON.stringify(this.stockItemList[i].label));
        }
    }
  }

  clearValue(){
    localStorage.setItem('r_stockItemID',JSON.stringify(0));
    localStorage.setItem('r_stockItemName','');
  }

  getLedgers(fName) {
    this.reportsService[fName]().subscribe( res => {
        if (res && res.status === '200') {
            // this.ledgerList = res.data;
            let data = res.data;
            for (let key in data) {
              if (data.hasOwnProperty(key) && this.type=='po-report') {
                  this.ledgerList.push({label: data[key].supplierName, value: data[key].supplier_ID});
              }
              if (data.hasOwnProperty(key) && this.type=='so-report') {
                  this.ledgerList.push({label: data[key].customerName, value: data[key].customer_ID});
              }
            }
            if(localStorage.getItem('r_ledgerID')){  this.ledgerID = JSON.parse(localStorage.getItem('r_ledgerID')); }
            else{ localStorage.setItem('r_ledgerID', JSON.stringify(this.ledgerID)); }
            //let selected = this.ledgerList.find(row=>row.value == this.ledgerID);
            //this.ledger.push({label:selected.label,value:selected.value});
            //this.ledgerName = selected.label;
        }
    });
  }

  onChangeLedger(event){
    if(event.value && event.value!=''){
        //let selected = this.ledgerList.find(row=>row.value == event.value);
        localStorage.setItem('r_ledgerID', JSON.stringify(event.value));
        //localStorage.setItem('r_ledgerName', JSON.stringify(selected.label));
    }
    else{
        localStorage.setItem('r_ledgerID', JSON.stringify(0));
    }
  }
}
