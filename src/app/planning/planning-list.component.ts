import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute,Router} from '@angular/router';
import {FormBuilder, Validators, FormArray} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PlanningService} from './services/planning.service';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-planning-list',
    templateUrl: './planning-list.component.html',
    styleUrls: ['./planning.component.scss']    
})
export class PlanningListComponent implements OnInit, OnDestroy {
    public type:any;
    public planningList: any;
    public listData: any;
    public showLoader: boolean = false;
    public planningListDataSubscription: Subscription;


    constructor(
        private _planningService: PlanningService, 
        private router: Router,
        private _route: ActivatedRoute,
        private datePipe: DatePipe,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.showLoader = true;
        this._route.params.subscribe((params) => {
            this.type = params.type;
            if(this.type=='fg'){
                this.getList('getFGList');
            }
            else if(this.type=='rmq'){
                this.getList('getRMQList');
            }
        });
    }

    getList(fName){
       // this.showLoader = true;
        this.planningList = [];
        this.listData = [];

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
        let fDate = this.datePipe.transform(firstDay, 'dd/MM/yyyy'); 
        let tDate = this.datePipe.transform(lastDay, 'dd/MM/yyyy'); 
    
        this.planningListDataSubscription = this._planningService[fName](fDate,tDate).subscribe(
            result => {
               // this.showLoader = false;
                if (result && result.status === '200')  {
                    this.planningList = result.data;
                    this.listData = result.data;
                }
                this.showLoader = false;
            },
            error => {
               // this.showLoader = false;
            }
        );
      }

    set(type,planID){
        this.router.navigate(['/planning/'+type, planID]);
    }

    add(type){
        this.router.navigate(['/planning/add/'+type]);
    }

    ngOnDestroy() {
        this.planningListDataSubscription.unsubscribe();
    }


    applyFilter(filterValue: string){
        this.planningList = this.listData.filter(
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

}
