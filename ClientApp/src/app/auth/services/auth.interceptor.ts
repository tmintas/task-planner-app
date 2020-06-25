import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import AppState from '@states/app';
import { Store, select } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { token } from '@selectors/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store$ : Store<AppState>) { }

    intercept(request : HttpRequest<any>, requestHandler : HttpHandler) : Observable<HttpEvent<any>> {
      

        return this.store$.pipe(
            select(token),
            mergeMap((token : string) => {
                const authRequest = !!token 
                    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
                    : request;

                return requestHandler.handle(authRequest);
            })
        );
    }
}