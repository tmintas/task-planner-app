import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { go, goByUrl } from '@actions/router';

@Injectable()
export class RouterEffects {
    constructor(
        private router: Router,
        private actions$ : Actions) {}

    public Go$ = createEffect(() => this.actions$.pipe(
		ofType(go),
        tap((payload) => this.router.navigate(payload.path, payload.extras))
    ), { dispatch : false });
    
    public GoByUrl$ = createEffect(() => this.actions$.pipe(
		ofType(goByUrl),
        tap((payload) => this.router.navigateByUrl(payload.url))
	), { dispatch : false });
}