import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UnitResponse, Unit} from "../models/unit.model";
import {UnitService} from "../services/unit.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, OnDestroy {

    public unitList;
    public unitID;
    public unitDataSubscription: Subscription;
    constructor( private unitService: UnitService, private _route: ActivatedRoute, private _formBuilder: FormBuilder, private router : Router) { }
    public unit;
    public uForm;
    ngOnInit() {
        this.unitForm();
        this._route.params.subscribe((params) => {
            this.unitID = params.id;
            this.getUnitData();
        });


    }

    getUnitData() {
        this.unitDataSubscription = this.unitService.getAllUnits().subscribe((res: UnitResponse) => {
            let dataV = res.data;

            let arrValues = Object.values( dataV) ;


            for(let i =0; i< arrValues.length;  i++){
                if(dataV[i].unit_ID == this.unitID){
                    this.unit = dataV[i];

                }


            }


            if (this.unitID && this.unit) {

                this.uForm.controls['unitName'].setValue(this.unit['unitName']);

                this.uForm.controls['company_ID'].setValue(this.unit['company_ID']);

                this.uForm.controls['userID'].setValue(this.unit['userID']);

                this.uForm.controls['unit_ID'].setValue(this.unitID);

            }



            //console.log(this.ledger);

        });


    }

    unitForm(){
        this.uForm = this._formBuilder.group({
            unit_ID: [0],
            unitName: ['', [Validators.required, Validators.minLength(4)]],
            company_ID: ['', Validators.required],
            userID: ['', Validators.required]

        });
    }


    get unitName() { return this.uForm.get('unitName'); }

    get company_ID() { return this.uForm.get('company_ID'); }

    get userID() { return this.uForm.get('userID'); }

    ngOnDestroy() {
        this.unitDataSubscription.unsubscribe();
    }


    saveUnit(form:Unit){

        this.unitService.updateUnit(form).subscribe((res:UnitResponse)=>{
           if(res.status == '200'){
               alert("Updated");
               this.router.navigate(['/masters/units'])
           }
        });



    }

}
