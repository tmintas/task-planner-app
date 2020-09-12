import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const enum RouterActionTypes {

	GO = '[Router] Go',
	GO_BY_URL = '[Router] Go by Url',
	BACK = '[Router] Back',
	FORWARD = '[Router] Forward',
	GO_MONTH = '[Router] Go Month',
	GO_LANDING = '[Router] Go Landing',

	INIT_FROM_URL_START = '[Router] Init From Url Start',
	INIT_FROM_URL_SUCCESS = '[Router] Init From Url Success',
	INIT_FROM_URL_FAIL = '[Router] Init From Url Fail',
}

export const Go = createAction(RouterActionTypes.GO, props<{ path: any[], queryParams? : object, extras? : NavigationExtras }>());
export const GoByUrl = createAction(RouterActionTypes.GO_BY_URL, props<{ url : string }>());
export const GoLanding = createAction(RouterActionTypes.GO_LANDING);
export const back = createAction(RouterActionTypes.BACK);
export const forward = createAction(RouterActionTypes.FORWARD);
