import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromAuthSelectors from '@selectors/auth';
import { Store, select } from '@ngrx/store';
import AppState from '@states/app';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

    public SuccessMessage$ : Observable<string> = this.store$.pipe(select(fromAuthSelectors.getSignupSuccessMessage));

    constructor(private store$ : Store<AppState>) { 
        var a = 5;
    }

}
