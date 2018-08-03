import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { StockService } from '../services/stock.service';
import { StockResponse } from '../models/stock.model';


@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  stockListResponse: Observable<any>;
  stockListResponseFailed: Observable<boolean>;

  public stockList;
  constructor( private stockService: StockService) { }

  ngOnInit() {
    this.getStockList();
  }

  getStockList() {
    this.stockService.getAllStocks().subscribe((res: StockResponse) => {
      if (res && res.status == '200')  {
        this.stockList = res.data;
      }
    });
  }


}
