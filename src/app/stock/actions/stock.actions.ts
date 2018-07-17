import { Action } from '@ngrx/store';

export const SHOW_ALL = '[STOCK] Show All';
export const SHOW_ALL_SUCCESS = '[STOCK] Show All Success';
// export const CREATE = '[ARTICLE] Create';
// export const CREATE_SUCCESS = '[ARTICLE] Create Success';
// export const CREATE_FAILURE = '[ARTICLE] Create Failure';
// export const GET_BY_ID = '[ARTICLE] Get by Id';
// export const GET_BY_ID_SUCCESS = '[ARTICLE] Get by Id Success';
// export const RESET = '[ARTICLE] Reset';

export class ShowAllAction implements Action {
  readonly type = SHOW_ALL;
}
export class ShowAllSuccessAction implements Action {
  readonly type = SHOW_ALL_SUCCESS;
  constructor(public payload: any[]) {}
}
// export class CreateAction implements Action {
//   readonly type = CREATE;
//   constructor(public payload: Article) {}
// }
// export class CreateSuccessAction implements Action {
//   readonly type = CREATE_SUCCESS;
//   constructor(public payload: Article) {}
// }
// export class CreateFailureAction implements Action {
//   readonly type = CREATE_FAILURE;
//   constructor(public payload: any) {}
// }
// export class GetByIdAction implements Action {
//   readonly type = GET_BY_ID;
//   constructor(public payload: string) {}
// }
// export class GetByIdSuccessAction implements Action {
//   readonly type = GET_BY_ID_SUCCESS;
//   constructor(public payload: Article[]) {}
// }
// export class ResetAction implements Action {
//   readonly type = RESET;
// }

export type ALL_REDUCER_ACTIONS = ShowAllSuccessAction ;
  //
  // | CreateSuccessAction | CreateFailureAction
  // | GetByIdSuccessAction | ResetAction;
