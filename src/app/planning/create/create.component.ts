import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PlanningService} from '../services/planning.service';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private _planningService: PlanningService, 
    private router: Router,
    private _route: ActivatedRoute,
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private notificationsService: NotificationsService
  ) { }
  showLoader = false;
  public type:any;
  public id:any;
  public allStockItems = [];
  public planningDataSubscription: Subscription;

  public cForm;
  public fg;
  public rmq;
  // showError = false;
  // showSuccess = false;
  companyId = localStorage.getItem('companyID');
  date1 = new Date();
  date2 = new Date();
  date3 = new Date(); 
  filteredItems = []; 
  ledgerList = [];
  itemName:string;
  public displayItemDescDialog = [];
  
  ngOnInit() {
    this.showLoader = true;
    this.getStockItems();  
    this.getLedgers();    
    
    //setTimeout(() => {
        this._route.params.subscribe((params) => {
            this.type = params.type;
            this.id = params.id;
            
            if(this.type=='fg'){
                this.fgForm();
            }
            else if(this.type=='rmq'){
                this.rmqForm();
            }    
            if(!this.id)
                this.showLoader = false;                
        });
    //},4000);
  }


    getStockItems() {
        this._planningService.getAllStocks().subscribe( res => {
            if (res && res.status === '200') {
            // this.itemMasterList = res.data;
            let data = res.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.allStockItems.push({label: data[key].stockItemDesc, value: data[key].stockItemID});
                        //this.allStockItems.push({label: data[key].itemCode + ', ' + data[key].itemName, value: data[key].stockItemID});
                    }
                }
            }
            if(this.type=='fg' && this.id){
                this.fgForm();
                this.getData('getFGDetail',this.type,this.id);
            }
            else if(this.type=='rmq' && this.id){
                this.rmqForm();
                this.getData('getRMQDetail',this.type,this.id);
            }
            this.showLoader = false;
        });
    }

    getLedgers(){
        this._planningService.getAllSuppliers().subscribe( res => {
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

    getData(fName,type,id) {
       // this.showLoader = true;
        this.planningDataSubscription = this._planningService[fName](id).subscribe(res => {
           // this.showLoader = false;
            this[type] = res.data[0];
            if (this.type == 'fg') {
                var parts = this.fg['planDate'].split("-");
                let planDate = new Date(parts[0], parts[1] - 1, parts[2]);

                var parts1 = this.fg['periodFromDate'].split("-");
                let periodFromDate = new Date(parts1[0], parts1[1] - 1, parts1[2]);

                var parts2 = this.fg['periodToDate'].split("-");
                let periodToDate = new Date(parts2[0], parts2[1] - 1, parts2[2]);

                this.cForm.controls['planID'].setValue(this.fg['planID']);
                this.cForm.controls['planDate'].setValue(planDate);
                this.cForm.controls['periodFromDate'].setValue(periodFromDate);
                this.cForm.controls['periodToDate'].setValue(periodToDate);
                this.cForm.controls['prevPlanID'].setValue(this.fg['prevPlanID']);
                this.cForm.setControl('fgPlanDetails', this._formBuilder.array((this.fg['fgPlanDetails'] || []).map((x) => this._formBuilder.group(x) )));
            }
            if (this.type == 'rmq') {
                var parts = this.rmq['rmqDate'].split("-");
                let rmqDate = new Date(parts[2], parts[1] - 1, parts[0]);

                this.cForm.controls['rmqid'].setValue(this.rmq['rmqid']);
                this.cForm.controls['rmqDate'].setValue(rmqDate);
                this.cForm.controls['planID'].setValue(this.rmq['planID']);
                this.cForm.controls['companyID'].setValue(this.rmq['companyID']);
                this.cForm.setControl('rmqDetail', this._formBuilder.array((this.rmq['rmqDetail'] || []).map((x) => this._formBuilder.group(x) )));
            }
        });
    }

    fgForm() {
        this.cForm = this._formBuilder.group({
            planID: [{value:0,disabled:true},Validators.required],
            planDate: ['', [Validators.required]],
            periodFromDate: ['', [Validators.required]],
            periodToDate: ['', [Validators.required]],
            companyID: [JSON.parse(this.companyId)],
            prevPlanID:[0],
            fgPlanDetails:  this._formBuilder.array([this.createfgPlanDetails()]),
        });
    }
    createfgPlanDetails() {
        return this._formBuilder.group({
            stockItemDesc:[''],
            stockItemID:[0],
            currentPlanQty: [0],
            currentMonthQty:[0],
            nextMonthQty:[0],
            orderMonthQty:[0],
            futureRequiredQty:[0],
            futureRequiredLength:[0],
            futureRequiredStops:[0],
            priority:[0],
            netRequiredQty:[0],
            fgStockQty:[0],
            cumulativeLength:[0],
            cumulativeStops:[0]
        });
    }
    addFGItems() {
        const stockItemArray = <FormArray>this.cForm.get('fgPlanDetails');
        stockItemArray.push(
          this._formBuilder.group({
            stockItemDesc:[''],
            stockItemID:[0],
            currentPlanQty: [0],
            currentMonthQty:[0],
            nextMonthQty:[0],
            orderMonthQty:[0],
            futureRequiredQty:[0],
            futureRequiredLength:[0],
            futureRequiredStops:[0],
            priority:[0],
            netRequiredQty:[0],
            fgStockQty:[0],
            cumulativeLength:[0],
            cumulativeStops:[0]
          })
        );
    }
  
    removeFGItems(index) {
        const stockItemArray = <FormArray>this.cForm.get('fgPlanDetails');
        stockItemArray.removeAt(index);
    }

    rmqForm() {
        this.cForm = this._formBuilder.group({
            rmqid: [{value:0,disabled:true},Validators.required],
            rmqDate: ['', [Validators.required]],
            planID: [0],
            companyID: [JSON.parse(this.companyId)],
            rmqDetail:  this._formBuilder.array([this.creatermqDetail()]),
        });
    }
    creatermqDetail() {
        return this._formBuilder.group({
            stockItemDesc:[''],
            stockItemID: [0],
            currentMonthQty:[0],
            nextMonthQty:[0],
            orderMonthQty:[0],
            requiredQty:[0],
            storeStockQty:[0],
            pendingOrderQty:[0],
            wipQty:[0],
            leadTime:[0],
            moQty:[0],
            netRequiredQty:[0],
            ledgerID:[0],
           // supplierName:[0],
        });
    }
    addRMQItems() {
        const stockItemArray = <FormArray>this.cForm.get('rmqDetail');
        stockItemArray.push(
          this._formBuilder.group({
            stockItemDesc:[''],
            stockItemID: [0],
            currentMonthQty:[0],
            nextMonthQty:[0],
            orderMonthQty:[0],
            requiredQty:[0],
            storeStockQty:[0],
            pendingOrderQty:[0],
            wipQty:[0],
            leadTime:[0],
            moQty:[0],
            netRequiredQty:[0],
            ledgerID:[0],
           // supplierName:[0],
          })
        );
    }
  
    removeRMQItems(index) {
        const stockItemArray = <FormArray>this.cForm.get('rmqDetail');
        stockItemArray.removeAt(index);
    }

    get planDate() { return this.cForm.get('planDate'); }
    get periodFromDate() { return this.cForm.get('periodFromDate'); }
    get periodToDate() { return this.cForm.get('periodToDate'); }

    get rmqDate() { return this.cForm.get('rmqDate'); }
    get planID() { return this.cForm.get('planID'); }    

    saveFg (form: any) {
       form.planDate = this.datePipe.transform(form.planDate, 'yyyy-MM-dd'); 
       form.periodFromDate = this.datePipe.transform(form.periodFromDate, 'yyyy-MM-dd'); 
       form.periodToDate = this.datePipe.transform(form.periodToDate, 'yyyy-MM-dd'); 
        this._planningService.updateFG(form).subscribe(res => {
            if (res.status === '200') {
                //this.showSuccess = true;
                this.notificationsService.notify('success','Success','You have Updated/created successfully.');
                setTimeout(() => {
                  this.router.navigate(['/planning/list/fg']);
                }, 3000);
            } else {
              //this.showError = true;
              this.notificationsService.notify('error','Error','Updatation/creation failed.')
            }
        });
    }

    saveRmq (form: any) {
        form.rmqDate = this.datePipe.transform(form.rmqDate, 'yyyy-MM-dd'); 
        this._planningService.updateRMQ(form).subscribe(res => {
            if (res.status === '200') {
                //this.showSuccess = true;
                this.notificationsService.notify('success','Success','You have Updated/created successfully.');
                setTimeout(() => {
                  this.router.navigate(['/planning/list/rmq']);
                }, 3000);
            } else {
            //  this.showError = true;
              this.notificationsService.notify('error','Error','Updatation/creation failed.')
            }
        });
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

    loadItems(){
        this.showLoader = true;
        this._planningService.getStockItemForGroup().subscribe(res => {
            if (res.status === '200') {
                //console.log(res);
                let data = res.data;
                const formArray = <FormArray>this.cForm.get('fgPlanDetails');
                formArray.removeAt(0);    
                for (let i = 0; i < data.length; i++) {
                  formArray.push(
                    this._formBuilder.group ({
                        stockItemDesc:[data[i].stockItemDesc],
                        stockItemID:[data[i].stockItemID],
                        currentPlanQty: [0],
                        currentMonthQty:[0],
                        nextMonthQty:[0],
                        orderMonthQty:[0],
                        futureRequiredQty:[0],
                        futureRequiredLength:[0],
                        futureRequiredStops:[0],
                        priority:[0],
                        netRequiredQty:[0],
                        fgStockQty:[0],
                        cumulativeLength:[0],
                        cumulativeStops:[0]
                    })
                  );    
                }
                //this.cForm.setControl('fgPlanDetails', this._formBuilder.array((data || []).map((x) => this._formBuilder.group(x) )));
            }
            this.showLoader = false; 
        });
    }

    loadPrevPlan(){
        this.showLoader = true;
        this.planningDataSubscription = this._planningService.getFGDetail(0).subscribe(res => {
            this.fg = res.data[0];
            if (res.status === '200') {
                var parts = this.fg['planDate'].split("-");
                let planDate = new Date(parts[0], parts[1] - 1, parts[2]);

                var parts1 = this.fg['periodFromDate'].split("-");
                let periodFromDate = new Date(parts1[0], parts1[1] - 1, parts1[2]);

                var parts2 = this.fg['periodToDate'].split("-");
                let periodToDate = new Date(parts2[0], parts2[1] - 1, parts2[2]);

                this.cForm.controls['planID'].setValue(this.fg['planID']);
                this.cForm.controls['planDate'].setValue(planDate);
                this.cForm.controls['periodFromDate'].setValue(periodFromDate);
                this.cForm.controls['periodToDate'].setValue(periodToDate);
                this.cForm.controls['prevPlanID'].setValue(this.fg['prevPlanID']);
                this.cForm.setControl('fgPlanDetails', this._formBuilder.array((this.fg['fgPlanDetails'] || []).map((x) => this._formBuilder.group(x) )));
            }  
            this.showLoader = false;  
        });
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
        if(this.type == 'fg'){
           this.exportAsExcelFile(this.fg['fgPlanDetails'], this.capitalizeFirstLetter('FG Planning Item Details'));
        }
        else if(this.type == 'rmq'){
            this.exportAsExcelFile(this.rmq['rmqDetail'], this.capitalizeFirstLetter('RMQ Planning Item Details'));
        }
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

    showDialog(index){
        this.displayItemDescDialog[index] = true;
    }
    closeDialog(index){
        this.displayItemDescDialog[index] = false;
    }
}
