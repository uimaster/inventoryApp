import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {StockGroupService} from "../services/stock-group.service";
import {StockGroup, StockGroupResponse} from "../models/stock-group.model";

@Component({
    selector: 'app-stock-group',
    templateUrl: './stock-group.component.html',
    styleUrls: ['./stock-group.component.scss']
})
export class StockGroupComponent implements OnInit, OnDestroy {

    public stockGroupList;
    public stockGroupId;
    public stockGroupDataSubscription: Subscription;
    public stockgroup;
    public stockGroupForm;
    constructor( private stockGroupService: StockGroupService, private _route: ActivatedRoute, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.stockGroupFormC();
        this._route.params.subscribe((params) => {
            this.stockGroupId = params.id;
            this.getStockData();
        });


    }

    getStockData() {
        this.stockGroupDataSubscription = this.stockGroupService.getAllStockGroups().subscribe((res: StockGroupResponse) => {
            let dataV = res.data;

            let arrValues = Object.values( dataV) ;


            for(let i =0; i< arrValues.length;  i++){
                if(dataV[i].stockGroup_ID == this.stockGroupId){
                    this.stockgroup = dataV[i];

                }


            }


            if (this.stockGroupId && this.stockgroup) {

                this.stockGroupForm.controls['stockGroupName'].setValue(this.stockgroup['stockGroupName']);

                this.stockGroupForm.controls['parentName'].setValue(this.stockgroup['parentName']);

                this.stockGroupForm.controls['activeStatus'].setValue(this.stockgroup['userID']);

                this.stockGroupForm.controls['company_ID'].setValue(this.stockgroup["company_ID"]);
                this.stockGroupForm.controls['userID'].setValue(this.stockgroup["userID"]);

                this.stockGroupForm.controls['stockGroup_ID'].setValue(this.stockGroupId);

            }



            //console.log(this.ledger);

        });


    }

    stockGroupFormC(){
        this.stockGroupForm = this._formBuilder.group({
            stockGroup_ID: [0],
            stockGroupName: ['', Validators.required],
            parentName: ['', Validators.required],
            activeStatus: ['', Validators.required],
            company_ID: ['', Validators.required],
            userID: ['', Validators.required],

        });
    }

    ngOnDestroy() {
        this.stockGroupDataSubscription.unsubscribe();
    }


    saveStockGroup(form:StockGroup){

        this.stockGroupService.updateStockGroup(form).subscribe()



    }

}
