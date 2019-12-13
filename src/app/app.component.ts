import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	public IsLoading : boolean = true;

	constructor(private router: Router) {
		this.router.events.pipe(
			map((re : Event) => {
				if (re instanceof NavigationStart) {
					this.IsLoading = true;
				}
				if (re instanceof NavigationEnd || re instanceof NavigationCancel || re instanceof NavigationError) {
					this.IsLoading = false
				}
			})
		).subscribe();
	}
}
