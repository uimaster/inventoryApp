
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

// import {BookListResponse} from '../models/addBook.Model';

import * as getStockActions from '../actions/stock.actions';
import { StockService } from '../services/stock.service';

@Injectable()

export class GetStockListEffect {
  constructor( private action$: Actions, private getStockService: StockService) {}

  @Effect()

  GetStockList: Observable<Action> = this.action$.pipe(
      ofType(getStockActions.GetStockActionTypes.GETSTOCKLIST),
      mergeMap( action =>
          this.getStockService.getAllStocks().pipe(
              map((getStockResponse) => {
                  if (getStockResponse != null) {
                      return new getStockActions.GetStockListSuccess({getStockResponse});
                  } else {
                      return new getStockActions.GetStockListFailed(true);
                  }
              }),
              catchError(() => of ({
                  type: getStockActions.GetStockActionTypes.GETSTOCKFAILED
              }))

      ))
    )
}
