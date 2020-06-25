import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const enum TodoActionTypes {

	GO = '[Router] Go',
	GO_BY_URL = '[Router] Go by Url',
	BACK = '[Router] Back',
	FORWARD = '[Router] Forward',
	GO_MONTH = '[Router] Go Month'
}

export const Go = createAction(TodoActionTypes.GO, props<{ path: any[], queryParams? : object, extras? : NavigationExtras }>());
export const goByUrl = createAction(TodoActionTypes.GO_BY_URL, props<{ url : string }>());
export const back = createAction(TodoActionTypes.BACK);
export const forward = createAction(TodoActionTypes.FORWARD);

