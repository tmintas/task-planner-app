import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import AppState from "@states/app";
import { accessToken } from "@selectors/auth";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store$: Store<AppState>) { }

    intercept(request : HttpRequest<any>, requestHandler : HttpHandler) : Observable<HttpEvent<any>> {
        return this.store$.pipe(
        	select(accessToken),
        	switchMap((accessToken: string) => {
				const authRequest = !!accessToken 
				    ? request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
				    : request;
				
				return requestHandler.handle(authRequest);
			})
		);
    }
}
