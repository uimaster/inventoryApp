import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {StockGroupService} from '../services/stock-group.service';
import {StockGroupResponse} from '../models/stock-group.model';
import {Router} from "@angular/router";
import { UsersService } from '../../../users/service/user.service';


@Component({
    selector: 'app-unit-list',
    templateUrl: './stock-group-list.component.html',
    styleUrls: ['./stock-group-list.component.scss']
})
export class StockGroupListComponent implements OnInit {

    public stockGroupList;
    public userRightMenuData = {};
    constructor( private stockGroupService: StockGroupService, private _router: Router, private userService: UsersService) { }

    ngOnInit() {
        this.getStockGroupList();
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


    getStockGroupList() {
        this.stockGroupService.getAllStockGroups().subscribe((res: StockGroupResponse) => {
            if (res && res.status === '200')  {
                this.stockGroupList = res.data;
                // console.log(this.unitList);

            }
        });
    }

    addStockGroup(){
        this._router.navigate(['/masters/add-stock-group']);
    }

    editStockGroup(stockGroupId){
// <<<<<<< HEAD
//         this._router.navigate(['/stock-groups/stock-group', stockGroupId]);
// =======
        this._router.navigate(['/masters/stock-group', stockGroupId]);

    }
    
    

}
