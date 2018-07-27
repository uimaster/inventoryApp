import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {StockState} from '../reducers/index';
import * as fromReducer from '../reducers/stock.reducers';
import * as fromActions from '../actions/stock.actions';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  stocks$: Observable<any[]>;
  message$: Observable<any>;

  constructor(private store: Store<StockState>) {
  //  this.stocks$ = store.select(fromReducer.getStocks);
  //   console.log(this.stocks$);
  //   this.message$ = store.select(fromReducer.getMessage);
  }

  ngOnInit() {
    this.store.dispatch(new fromActions.ShowAllAction());
   this.stocks$ = this.store.select('stocks');
    console.log(this.stocks$);

  }

}
