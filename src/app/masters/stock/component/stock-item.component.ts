import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

import { StockService } from '../services/stock.service';
import { StockResponse } from '../models/stock.model';
import { UsersService } from '../../../users/service/user.service';


@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {
  public showLoader = false;
  stockListResponse: Observable<any>;
  stockListResponseFailed: Observable<boolean>;
  public stockList;
  public listData;
  public userRightMenuData = {};
  constructor( private stockService: StockService, private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.getStockList();
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

  getStockList() {
    this.showLoader = true;
    this.stockService.getAllStocks().subscribe((res: StockResponse) => {
      if (res && res.status === '200')  {
        this.stockList = res.data;
        this.listData = res.data;
      }
      this.showLoader = false;
    });
  }

  getDetails(id) {
    this.router.navigate(['/stocks/stock-details', id]);
  }

  editStock(stockItemID) {
      this.router.navigate(['/masters/stock-item', stockItemID]);
  }

  addStockItem(stockItemID) {
    this.router.navigate(['/masters/stock-item', stockItemID]);
  }

  applyFilter(filterValue: string){
        this.stockList = this.listData.filter(
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
