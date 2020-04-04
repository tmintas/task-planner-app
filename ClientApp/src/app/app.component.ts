import { Component, ViewEncapsulation } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import AppState from '@states/app';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromRouterSelectors from '@selectors/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	constructor(private notificationService : NotificationService, private store : Store<AppState>) {
		this.store.pipe(
			select(fromRouterSelectors.selectState),
			map(() => this.notificationService.RemoveAllNotifications())
		).subscribe();
	}
}
