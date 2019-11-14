import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthModule } from './month/month.module';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/reducers/app.reducer';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		StoreModule.forRoot(fromApp.appReducer, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true,
			}
		}),
		BrowserModule,
		AppRoutingModule,
		MonthModule,
		NgbModule,
		FormsModule
	],
	providers: [DatePipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
