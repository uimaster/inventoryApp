import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {StockGroupService} from '../services/stock-group.service';
import {StockGroup, StockGroupResponse} from '../models/stock-group.model';

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
    companyId = localStorage.getItem('companyID');
    userId = localStorage.getItem('userID');
    showError = false;
    showSuccess = false;
    public stockGroupLists = [];
    public activeStatusArr = [{label: 'False', value: 'False'}, {label: 'True', value: 'True'}];

    constructor (
      private stockGroupService: StockGroupService,
      private _route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private _router: Router
    ) { }

    ngOnInit() {
        this.getStockGroupData();
        this.stockGroupFormC();
        setTimeout(() => {
          this._route.params.subscribe((params) => {
            this.stockGroupId = params.id;
            this.getStockData();
          });
        }, 1000);



    }

    getStockData() {
        this.stockGroupDataSubscription = this.stockGroupService.getAllStockGroups().subscribe((res: StockGroupResponse) => {
            let dataV = res.data;

            let arrValues = Object.values( dataV) ;


            for (let i = 0; i < arrValues.length;  i++) {
                if(dataV[i].stockGroup_ID == this.stockGroupId) {
                    this.stockgroup = dataV[i];

                }


            }


            if (this.stockGroupId && this.stockgroup) {
                this.stockGroupForm.controls['stockGroupName'].setValue(this.stockgroup['stockGroupName']);
                this.stockGroupForm.controls['parentName'].setValue(this.stockgroup['parentName']);
                this.stockGroupForm.controls['activeStatus'].setValue(this.stockgroup['activeStatus']);
                this.stockGroupForm.controls['company_ID'].setValue(this.stockgroup['company_ID']);
                this.stockGroupForm.controls['userID'].setValue(this.stockgroup['userID']);
                this.stockGroupForm.controls['stockGroup_ID'].setValue(this.stockGroupId);
            }



            // console.log(this.ledger);

        });


    }

    stockGroupFormC() {
        this.stockGroupForm = this._formBuilder.group({
            stockGroup_ID: [0],
            stockGroupName: ['', [Validators.required, Validators.minLength(2)]],
            parentName: ['', Validators.required],
            activeStatus: ['', Validators.required],
            company_ID: [this.companyId],
            userID: [this.userId],

        });
    }


    get stockGroupName() { return this.stockGroupForm.get('stockGroupName'); }

    get parentName() { return this.stockGroupForm.get('parentName'); }

    get activeStatus() { return this.stockGroupForm.get('activeStatus'); }


    get company_ID() { return this.stockGroupForm.get('company_ID'); }


    get userID() { return this.stockGroupForm.get('userID'); }


    ngOnDestroy() {
        this.stockGroupDataSubscription.unsubscribe();
    }


    saveStockGroup(form: StockGroup) {

        this.stockGroupService.updateStockGroup(form).subscribe((res:StockGroupResponse)=>{
            if (res.status === '200') {
                this.showSuccess = true;
                setTimeout(() => {
                  this._router.navigate(['/masters/stockGroups'])
                }, 3000);
            } else {
              this.showError = true;
            }
        });



    }


    getStockGroupData(){

        this.stockGroupService.getAllStockGroups().subscribe((res: any) => {
            if (res && res.status === '200')  {

                const data = res.data;
                for (let i = 0; i < data.length; i++) {
                    // the property after data[i]. needs to match the exact name that is on your JSON fileSo,
                    // name is a different property than Name
                    // this.stockGroupLists.push({label: data[i].stockGroupName, value: data[i].stockGroup_ID});
                    this.stockGroupLists.push({label: data[i].stockGroupName, value: data[i].stockGroupName});
                }

               // this.stockGroupList = res.data;
                // console.log(this.unitList);

            }
        });

    }

}
