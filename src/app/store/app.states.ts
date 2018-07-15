import * as auth from './reducers/auth.reducers';
import * as stock from './reducers/stock.reducers';

import {createFeatureSelector} from '@ngrx/store';

export interface StockState {
  stocks: any[];
  message: any;
}

export interface AppState {
  authState: auth.State;
  stockState: StockState;

}

export const reducers = {
  auth: auth.reducer,
  stock: stock.reducer

};

export const selectAuthState = createFeatureSelector<AppState>('auth');
