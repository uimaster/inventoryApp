import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SupplierService} from "../services/supplier.service";
import {SupplierResponse} from "../models/supplier.model";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit, OnDestroy {
    public supplierList: any;
    public supplierListDataSubscription: Subscription;
    constructor(private supplierService:SupplierService, private router: Router) { }

    ngOnInit() {
        this.getSupplierList();
    }

    getSupplierList() {
        this.supplierListDataSubscription = this.supplierService.getAllSuppliers().subscribe((res: SupplierResponse) => {
            if (res && res.status === '200')  {

                this.supplierList = res.data;
                // console.log(this.unitList);

            }
        });
    }

    setSupplier(supplierID) {
    
        // this.sharedledgerservice.setLedger(ledger);
        this.router.navigate(['/masters/supplier', supplierID]);
    
    }
    
    addSupplier(){
        this.router.navigate(['/masters/add-supplier']);
    }

    ngOnDestroy() {
        this.supplierListDataSubscription.unsubscribe();
    }




}
