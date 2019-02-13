import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';

import { StockService } from '../services/stock.service';
import { StockResponse } from '../models/stock.model';


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
  constructor( private stockService: StockService, private router: Router) { }

  ngOnInit() {
    this.getStockList();
  }

  getStockList() {
    this.showLoader = true;
    this.stockService.getAllStocks().subscribe((res: StockResponse) => {
      if (res && res.status === '200')  {
        this.stockList = res.data;
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

}
