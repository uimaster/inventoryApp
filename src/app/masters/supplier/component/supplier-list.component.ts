import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SupplierService} from "../services/supplier.service";
import {SupplierResponse} from "../models/supplier.model";
import { UsersService } from '../../../users/service/user.service';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit, OnDestroy {
    public supplierList: any;
    public listData: any;
    public supplierListDataSubscription: Subscription;
    public userRightMenuData = {};
    constructor(private supplierService: SupplierService, private router: Router, private userService: UsersService) { }

    ngOnInit() {
        this.getSupplierList();
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

    getSupplierList() {
        this.supplierListDataSubscription = this.supplierService.getAllSuppliers().subscribe((res: SupplierResponse) => {
            if (res && res.status === '200')  {

                this.supplierList = res.data;
                this.listData = res.data;
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

    applyFilter(filterValue: string){
        this.supplierList = this.listData.filter(
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
