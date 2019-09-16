import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CustomerService} from '../services/customer.service';
import {CustomerResponse} from '../models/customer.model';
import { UsersService } from '../../../users/service/user.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
    public customerList: any;
    public listData: any;
    public customerListDataSubscription: Subscription;
    public userRightMenuData = {};
    constructor(private customerService: CustomerService, private router: Router, private userService: UsersService) { }

    ngOnInit() {
        this.getCustomerList();
        this.getUserMenuDetails();
    }

    getUserMenuDetails() {
      let userID = localStorage.getItem('userID');
      let userRightMenuID = localStorage.getItem('userRightMenuID');
      this.userService.getUserMenuDetails(userID, userRightMenuID).subscribe( val => {
        if (val.status === '200') {
          this.userRightMenuData = val.data[0].userRightTabModelList;
        }
      });
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
