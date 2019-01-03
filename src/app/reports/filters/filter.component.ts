import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { Router } from '@angular/router';
import { Location,DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FiltersComponent implements OnInit, OnDestroy {
  public dateValue1 = new Date();
  public dateValue2 = new Date();
  public fromDate = '';
  public toDate = '';
  public currentUrl = '';
  public selectedReportType = 1;
  public reportTypeList = [ {label: 'All', value: 1}, {label: 'Pending List', value: 2}];
  public stockItemList = [];
  public filteredItems = [];  
  public ledgerList = [];
  public ledgerID = 0;
  public stockItemID = 0;
  itemName: string;  


  constructor(private reportsService: ReportsService, private router: Router, private location: Location,private datePipe: DatePipe,) {
    this.currentUrl = window.location.href;
  }

  ngOnDestroy() {
    if (window.location.href !== this.currentUrl) {
      localStorage.removeItem('r_fromDate');
      localStorage.removeItem('r_toDate');
      localStorage.removeItem('r_reportsTypeID');
      localStorage.removeItem('r_stockItemID');
      localStorage.removeItem('r_ledgerID');
    }
  }

  ngOnInit() {
    this.getStockItemList();
    this.getLedgers();

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

  getReportType(){
      //console.log('selectedReportType',this.selectedReportType);
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
                //this.stockItemList = result.data;
                let data = result.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.stockItemList.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
                    }
                }
                if (localStorage.getItem('r_stockItemID')) { 
                    let stockItemID = JSON.parse(localStorage.getItem('r_stockItemID'));
                    if(stockItemID != 0){
                        let item = this.stockItemList.find(item => item.value == stockItemID);
                        this.itemName = item.label;
                        this.stockItemID = item.stockItemID;
                    }
                    
                    // this.stockItemID = [{
                    //     label:item.label,
                    //     value:item.stockItemID
                    // }]; 
                }
                else{
                    localStorage.setItem('r_stockItemID', JSON.stringify(this.stockItemID));
                }
                
            }
        },
        //error => { // this.showLoader = false; }
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
        console.log('enter');
        for ( var i = 0; i < this.stockItemList.length; i++) {
            if (this.stockItemList[i].label === event) {
                localStorage.setItem('r_stockItemID', JSON.stringify(this.stockItemList[i].value));
            }
        }
    }

    clearValue(){
        localStorage.setItem('r_stockItemID',JSON.stringify(0));
    }

    getLedgers(){
        this.reportsService.getAllSuppliers().subscribe( res => {
            if (res && res.status === '200') {
              // this.ledgerList = res.data;
              let data = res.data;
              for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    this.ledgerList.push({label: data[key].supplierName, value: data[key].supplier_ID});
                }
              }
              if(localStorage.getItem('r_ledgerID')){ 
                this.ledgerID = JSON.parse(localStorage.getItem('r_ledgerID')); 
              }
              else{
                localStorage.setItem('r_ledgerID', JSON.stringify(this.ledgerID));
              }
            }
        });
    }

    onChangeLedger(event){   
       if(event.value!=''){
        localStorage.setItem('r_ledgerID', JSON.stringify(event.value));
       }
       else{
        localStorage.setItem('r_ledgerID', JSON.stringify(0));   
       }
    }

}
