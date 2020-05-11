import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import AppState from '@states/app';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '@actions/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store$ : Store<AppState>) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (localStorage.getItem('token') != null) {
            return true;
        } else {
            this.store$.dispatch(fromAuthActions.GoDenied());            
        }
    }

}
