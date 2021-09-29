import { Component, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import AppState from '@states/app';
import * as fromRouterSelectors from '@selectors/router';
import * as fromCalendarSelectors from '@selectors/calendar';
import * as fromAuthSelectors from '@selectors/auth';
import * as fromTodoSelectors from '@selectors/todo';
import { InitUser } from '@actions/auth';
import { NotificationService } from './shared/services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public IsLoading$: Observable<boolean>;
    public LoadingMessage$: Observable<string>;

    constructor(private notificationService: NotificationService, private store: Store<AppState>) {
        this.IsLoading$ = combineLatest([
            this.store.pipe(select(fromAuthSelectors.isLoading)),
            this.store.pipe(select(fromCalendarSelectors.isLoading)),
            this.store.pipe(select(fromTodoSelectors.isLoading)),
        ]).pipe(
            map(([authLoading, calendarLoading, itemsLoading]) => authLoading || calendarLoading || itemsLoading),
        );

        this.LoadingMessage$ = combineLatest([
            this.store.pipe(select(fromAuthSelectors.loadingMessage)),
            this.store.pipe(select(fromTodoSelectors.loadingMessage)),
        ]).pipe(
            map(([authLoadingMessage, totoLoadingMessage]) => authLoadingMessage || totoLoadingMessage),
        );	

        // TODO remove, replace with router effects
        this.store.pipe(
            select(fromRouterSelectors.selectFeature),
            map(() => this.notificationService.RemoveAllNotifications())
        ).subscribe();

        this.store.dispatch(InitUser());
    }
}
