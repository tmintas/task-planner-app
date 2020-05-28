import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import AppState from '@states/app';
import { Observable } from 'rxjs';
import { currentUserName } from '@selectors/auth';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public UserName$ : Observable<string> = this.store$.select(currentUserName);

    constructor(private store$: Store<AppState>) { }

    ngOnInit() { }
}
