import { GetStockListActionUnion, GetStockActionTypes} from '../actions/stock.actions';
import {StockState} from '../../auth/reducers';

export interface State {
  loading: boolean;
  result: any;
  error: boolean;
}

const initialState: State = {
  loading: false,
  result: null,
  error: false
}

export function Reducer( state = initialState, action: GetStockListActionUnion): State {
  switch ( action.type ) {
    case GetStockActionTypes.GETSTOCKLIST: {
      return {
        ...state,
        loading: true
      };
    }

    case GetStockActionTypes.GETSTOCKLIST: {
      return {
        ...state,
        loading: false,
        result: action.payload
      };
    }

    case GetStockActionTypes.GETSTOCKFAILED: {
      return {
        ...state,
        loading: false,
        // result: null,
        error: action.payload
      };
    }

    default: {
      return initialState;
    }
  }
}

export const getLoading = ( state: State) => state.loading;
export const getResult = ( state: State) => state.result;
export const getError = ( state: State) => state.error;


