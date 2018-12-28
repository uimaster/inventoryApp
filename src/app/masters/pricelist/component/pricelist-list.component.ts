import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute,Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PricelistService} from '../services/pricelist.service';
import {PricelistResponse} from '../models/pricelist.model';

@Component({
    selector: 'app-pricelist-list',
    templateUrl: './pricelist-list.component.html',
    styleUrls: ['./pricelist-list.component.scss']
})
export class PricelistListComponent implements OnInit, OnDestroy {
    public priceList: any;
    public typeID;
    public priceListListDataSubscription: Subscription;
    public loadingList: boolean = false;
    constructor(
        private priceListService: PricelistService, 
        private router: Router,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this._route.params.subscribe((params) => {
            this.typeID = params.typeID;
            this.getPricelistList();
        });
    }

    getPricelistList() {
        this.loadingList = true;
        this.priceListListDataSubscription = this.priceListService.getAllPricelists(this.typeID,0).subscribe((res: PricelistResponse) => {
            this.loadingList = false;
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
}
