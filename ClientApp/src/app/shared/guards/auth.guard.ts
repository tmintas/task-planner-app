import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import AppState from '@states/app';
import { Store, select } from '@ngrx/store';
import { GoDenied } from '@actions/auth';
import { map } from 'rxjs/operators';
import { isAuthenticated } from '@selectors/auth';
import { Go } from '@actions/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private store$ : Store<AppState>) {}

    canActivate(next: ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store$.pipe(
            select(isAuthenticated),
            map(isAuthenticated => {
                if (next.data.requiresToBeAuthenticated) {
                    if (isAuthenticated) {
                        return true;
                    } else {
                        const backUrl = next.params;
                        
                        this.store$.dispatch(GoDenied({ reason : next.data.error, backUrl: state.url }));
                        return false;
                    }
                } else {
                    if (isAuthenticated) {
                        this.store$.dispatch(Go({ path : [
                            'calendar',
                            next.params.year,
                            next.params.month,
                            'home',
                        ]}));

                        return false;
                    } else {
                        return true;
                    }
                }
            })
        );
    }

}
