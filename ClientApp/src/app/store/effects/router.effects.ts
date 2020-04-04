import * as fromRouterActions from '@actions/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
    constructor(
        private router: Router,
        private actions$ : Actions) {}

    public Go$ = createEffect(() => this.actions$.pipe(
		ofType(fromRouterActions.go),
        tap((payload) => this.router.navigate(payload.path, payload.extras))
	), { dispatch : false });
}