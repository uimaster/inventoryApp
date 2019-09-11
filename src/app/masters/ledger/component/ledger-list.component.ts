import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LedgerResponse, Ledger} from '../models/ledger.model';
import {LedgerService} from '../services/ledger.service';
import {SharedLedgerService} from '../services/shared-ledger.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { UsersService } from '../../../users/service/user.service';

@Component({
    selector: 'app-unit-list',
    templateUrl: './ledger-list.component.html',
    styleUrls: ['./ledger-list.component.scss']
})
export class LedgerListComponent implements OnInit, OnDestroy {
    public ledgerList: any;
    public userRightMenuData = {};
    public ledgerDataSubscription: Subscription;
    constructor( private ledgerService: LedgerService, private sharedledgerservice: SharedLedgerService, private router: Router, private userService: UsersService) { }

    ngOnInit() {
        this.getLedgerList();
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

    getLedgerList() {
        this.ledgerService.getAllLedgers().subscribe((res: LedgerResponse) => {
            if (res && res.status === '200')  {

               // const datal = Object.values(res.data);

                // var datal = Object.keys(res.data)
                // // iterate over them and generate the array
                //     .map(function(k) {
                //         // generate the array element
                //         return [+k, res.data[k]];
                //     });




               this.ledgerList = res.data;
                // console.log(this.unitList);

            }
        });
    }

    setLedger(ledger: Ledger, ledgerId) {

       // this.sharedledgerservice.setLedger(ledger);
        this.router.navigate(['/masters/ledger', ledgerId]);

    }

    addLedger(){
        this.router.navigate(['/masters/add-ledger']);
    }

    ngOnDestroy() {
        // this.sharedledgerservice.setLedger();
    }




}
