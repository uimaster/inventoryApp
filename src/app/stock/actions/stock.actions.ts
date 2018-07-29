import { Action } from '@ngrx/store';

export enum GetStockActionTypes {
  GETSTOCKLIST = '[Get] Stock List',
  GETSTOCKSUCCESS = '[Get] Stock List Success',
  GETSTOCKFAILED = '[Get] Stock List failed'
}

export class GetStockList implements Action {
  readonly type = GetStockActionTypes.GETSTOCKLIST;
  constructor( public payload: any) {}
}

export class GetStockListSuccess implements Action{
  readonly type = GetStockActionTypes.GETSTOCKSUCCESS;
  constructor ( public payload: any) {}
}

export class GetStockListFailed implements Action{
  readonly type = GetStockActionTypes.GETSTOCKFAILED;
  constructor ( public payload: any) {}
}

export type GetStockListActionUnion = GetStockList | GetStockListSuccess | GetStockListFailed;

