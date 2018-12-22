import * as auth from './auth.reducers';

import {createFeatureSelector} from '@ngrx/store';

export interface StockState {
  message: any;
}

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');