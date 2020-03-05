import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const enum TodoActionTypes {
	GO = '[Router] Go',
	BACK = '[Router] Back',
	FORWARD = '[Router] Forward',
}

export const go = createAction(TodoActionTypes.GO, props<{ path: any[], queryParams? : object, extras? : NavigationExtras }>());
export const back = createAction(TodoActionTypes.BACK);
export const forward = createAction(TodoActionTypes.FORWARD);

