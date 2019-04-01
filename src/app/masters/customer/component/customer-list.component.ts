import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CustomerService} from '../services/customer.service';
import {CustomerResponse} from '../models/customer.model';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
    public customerList: any;
    public listData: any;
    public customerListDataSubscription: Subscription;
    constructor(private customerService: CustomerService, private router: Router) { }

    ngOnInit() {
        this.getCustomerList();
    }

    getCustomerList() {
        this.customerListDataSubscription = this.customerService.getAllCustomers().subscribe((res: CustomerResponse) => {
            if (res && res.status === '200')  {

                this.customerList = res.data;
                this.listData = res.data;
                // console.log(this.unitList);

            }
        });
    }


    setCustomer(customerId){
        this.router.navigate(['/masters/customer', customerId]);
    }

    addCustomer(){
        this.router.navigate(['/masters/add-customer']);
    }
    ngOnDestroy() {
        this.customerListDataSubscription.unsubscribe();
    }


    applyFilter(filterValue: string){
        this.customerList = this.listData.filter(
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
