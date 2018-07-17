import * as stock from './stock.reducers';

import {createFeatureSelector} from '@ngrx/store';

export interface StockState {
  stocks: any[];
  message: any;
}

export interface AppState {
  stockState: StockState;
}

export const reducers = {
  stock: stock.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
