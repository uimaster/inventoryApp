import * as fromStockReducer from './stock.reducers';
import { createFeatureSelector, createSelector} from '@ngrx/store';

export interface GetStockListState {
  getStockListReducer: fromStockReducer.State;
}

export interface State extends fromStockReducer.State {
  'getStockListReducer': State;
}

export const reducers = {
  getStockListReducer: fromStockReducer.Reducer
}

export const getStockListMailState = createFeatureSelector<GetStockListState>('getStockListReducer');

export const getStockListState = createSelector( getStockListMailState, ( state: GetStockListState) => state.getStockListReducer);
export const getStockListLoading = createSelector( getStockListState, fromStockReducer.getLoading);
export const GetStockListSuccess = createSelector( getStockListState, fromStockReducer.getResult);
export const GetStockListFailed = createSelector( getStockListState, fromStockReducer.getError);
