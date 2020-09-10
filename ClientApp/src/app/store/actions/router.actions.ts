import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const enum RouterActionTypes {

	GO = '[Router] Go',
	GO_BY_URL = '[Router] Go by Url',
	BACK = '[Router] Back',
	FORWARD = '[Router] Forward',
	GO_MONTH = '[Router] Go Month',

	INIT_FROM_URL_START = '[Router] Init From Url Start',
	INIT_FROM_URL_SUCCESS = '[Router] Init From Url Success',
	INIT_FROM_URL_FAIL = '[Router] Init From Url Fail',
	GO_DEFAULTS = '[Router] Go Defaults'
}

export const Go = createAction(RouterActionTypes.GO, props<{ path: any[], queryParams? : object, extras? : NavigationExtras }>());
export const goByUrl = createAction(RouterActionTypes.GO_BY_URL, props<{ url : string }>());
export const back = createAction(RouterActionTypes.BACK);
export const forward = createAction(RouterActionTypes.FORWARD);

export const InitFromUrl = createAction(RouterActionTypes.INIT_FROM_URL_START);
export const InitFromUrlSuccess = createAction(RouterActionTypes.INIT_FROM_URL_SUCCESS, 
	props<{ year : number, month : number, day : number, itemId : number }>());
export const InitFromUrlFail = createAction(RouterActionTypes.INIT_FROM_URL_FAIL);
export const GoDefaults = createAction(RouterActionTypes.GO_DEFAULTS);

// export const ROUTER_NAVIGATED;