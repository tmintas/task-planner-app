import { Component, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import AppState from '@states/app';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromRouterSelectors from '@selectors/router';
import { InitUser } from '@actions/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(private notificationService : NotificationService, private store : Store<AppState>) {
		// TODO remove, replace with router effects
		this.store.pipe(
			select(fromRouterSelectors.selectFeature),
			map(() => this.notificationService.RemoveAllNotifications())
		).subscribe();

		this.store.dispatch(InitUser());
	}
}
