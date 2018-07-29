import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import {environment} from '../../environments/environment';


/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';

/**
 * Every reducers module's default export is the reducers function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducers plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as getAuthReducer from '../auth/reducers/index';
import * as getStockListReducer from '../stock/reducers';

/**
 * As mentioned, we treat each reducers like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  getAuthReducer: getAuthReducer.AppState;
  getStockListReducer: getStockListReducer.State;
}

/**
 * Our state is composed of a map of action reducers functions.
 * These reducers functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<any> = {
  getAuthReducer: getAuthReducer.reducers,
  getStockListReducer: getStockListReducer.reducers
} as any;

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducers map to compose
 * the root meta-reducers. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to userForm the root meta-reducers.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
