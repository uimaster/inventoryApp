import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStockAction from '../actions/stock.actions';
import * as getStockReducer from '../reducers/stock.reducers';
import * as getStockState from '../reducers/index';


@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  stockListResponse: Observable<any>;
  stockListResponseFailed: Observable<boolean>;

  stockList = {};
  constructor(private store: Store<getStockReducer.State>) { }

  ngOnInit() {
    // this.dispatchAction();
    // this.store.dispatch(new BookActions.AddBook('Add Book'));

    this.stockListResponse = this.store.select(getStockState.GetStockListSuccess);
    this.stockListResponse.subscribe(res => {
      this.stockList = res.data;
      console.log(res);
    });

    this.stockListResponseFailed = this.store.select(getStockState.GetStockListFailed);
    this.stockListResponseFailed.subscribe(res => {
      this.stockList = res;
      console.log(res);
    });

  }

  
  dispatchAction() {
    this.store.dispatch(new fromStockAction.GetStockList('Get Stock List'));
  }

}
