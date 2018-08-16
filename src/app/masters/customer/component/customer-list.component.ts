import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CustomerService} from "../services/customer.service";
import {CustomerResponse} from "../models/customer.model";

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
    public customerList: any;
    public customerListDataSubscription: Subscription;
    constructor(private customerService:CustomerService, private router: Router) { }

    ngOnInit() {
        this.getCustomerList();
    }

    getCustomerList() {
        this.customerListDataSubscription = this.customerService.getAllCustomers().subscribe((res: CustomerResponse) => {
            if (res && res.status === '200')  {

                this.customerList = res.data;
                // console.log(this.unitList);

            }
        });
    }

    // setLedger(ledger: Ledger, ledgerId) {
    //
    //     // this.sharedledgerservice.setLedger(ledger);
    //     this.router.navigate(['/masters/ledger', ledgerId]);
    //
    // }
    //
    // addLedger(){
    //     this.router.navigate(['/masters/add-ledger']);
    // }

    ngOnDestroy() {
        this.customerListDataSubscription.unsubscribe();
    }




}
