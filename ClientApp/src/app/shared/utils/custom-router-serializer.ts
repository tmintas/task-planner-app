import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterState } from '@states/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn : 'root'})
export class CustomSerializer implements RouterStateSerializer<CustomRouterState> {
    public serialize(routerState: RouterStateSnapshot): CustomRouterState {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        let serializedState : CustomRouterState = {
            url : routerState.url,
            params : route.params,
            queryParams : routerState.root.queryParams
        }

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        return serializedState;
    }
}
