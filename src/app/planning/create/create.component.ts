import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PlanningService} from '../services/planning.service';
import { DatePipe } from '@angular/common';

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
  ) { }
  showLoader = false;
  public type:any;
  public id:any;
  public allStockItems = [];
  public planningDataSubscription: Subscription;

  public cForm;
  public fg;
  public rmq;
  showError = false;
  showSuccess = false;
  companyId = localStorage.getItem('companyID');
  date1 = new Date();
  date2 = new Date();
  date3 = new Date();  
  
  ngOnInit() {
    this.showLoader = true;
    this.getStockItems();    
    
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
                        this.allStockItems.push({label: data[key].itemCode + ', ' + data[key].itemName, value: data[key].stockItemID});
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

    getData(fName,type,id) {
       // this.showLoader = true;
        this.planningDataSubscription = this._planningService[fName](id).subscribe(res => {
           // this.showLoader = false;
            this[type] = res.data[0];
            if (this.type == 'fg') {
                var parts = this.fg['planDate'].split("-");
                let planDate = new Date(parts[2], parts[1] - 1, parts[0]);

                var parts1 = this.fg['periodFromDate'].split("-");
                let periodFromDate = new Date(parts1[2], parts1[1] - 1, parts1[0]);

                var parts2 = this.fg['periodToDate'].split("-");
                let periodToDate = new Date(parts2[2], parts2[1] - 1, parts2[0]);

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
            planID: [0],
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

    rmqForm() {
        this.cForm = this._formBuilder.group({
            rmqid: [0],
            rmqDate: ['', [Validators.required]],
            planID: [0],
            companyID: [JSON.parse(this.companyId)],
            rmqDetail:  this._formBuilder.array([this.creatermqDetail()]),
        });
    }
    creatermqDetail() {
        return this._formBuilder.group({
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
            supplierName:[0],
        });
    }

    get planDate() { return this.cForm.get('planDate'); }
    get periodFromDate() { return this.cForm.get('periodFromDate'); }
    get periodToDate() { return this.cForm.get('periodToDate'); }

    get rmqDate() { return this.cForm.get('rmqDate'); }
    get planID() { return this.cForm.get('planID'); }    

    saveFg (form: any) {
       form.planDate = this.datePipe.transform(form.planDate, 'dd-mm-yyyy'); 
       form.periodFromDate = this.datePipe.transform(form.periodFromDate, 'dd-mm-yyyy'); 
       form.periodToDate = this.datePipe.transform(form.periodToDate, 'dd-mm-yyyy'); 
        this._planningService.updateFG(form).subscribe(res => {
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/planning/list/fg']);
                }, 3000);
            } else {
              this.showError = true;
            }
        });
    }

    saveRmq (form: any) {
        form.rmqDate = this.datePipe.transform(form.rmqDate, 'dd-mm-yyyy'); 
        this._planningService.updateRMQ(form).subscribe(res => {
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this.router.navigate(['/planning/list/rmq']);
                }, 3000);
            } else {
              this.showError = true;
            }
        });
    }
}
