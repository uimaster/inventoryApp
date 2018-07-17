// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import * as fromActions from '../actions/stock.actions';
// import {StockState} from '../../auth/reducers';

// export const initialState: StockState = {
//   stocks: [],
//   message: ''
// };
export function reducer() { }
// export function reducer(state = initialState, action: fromActions.ALL_REDUCER_ACTIONS): StockState {
//   switch (action.type) {
//     case fromActions.SHOW_ALL_SUCCESS: {
//       return {stocks: action.payload, message: 'Success'};
//     }
//     case fromActions.CREATE_SUCCESS: {
//       return {articles: [action.payload], message: 'Article Created.'};
//     }
//     case fromActions.CREATE_FAILURE: {
//       return {articles: [], message: action.payload};
//     }
//     case fromActions.GET_BY_ID_SUCCESS: {
//       console.log(action.payload);
//       return {articles: action.payload, message: 'Success'};
//     }
//     case fromActions.RESET: {
//       return { articles: [], message: ''};
//     }
//     default: {
//       return state;
//     }
//   }
// }

// export const getStockState = createFeatureSelector<StockState>('stockState');

// export const getStocks = createSelector(
//   getStockState,
//   (state: StockState) => state.stocks
// );

// export const getMessage = createSelector(
//   getStockState,
//   (state: StockState) => state.message
// );
