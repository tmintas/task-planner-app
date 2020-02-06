import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthModule } from './month/month.module';
import { SharedModule } from './shared/shared.module';
import { CustomSerializer } from './shared/utils/custom-router-serializer';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		StoreModule.forRoot({
			router: routerReducer
		}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({}),
		StoreRouterConnectingModule.forRoot({
			serializer: CustomSerializer
		}),
		SharedModule,
		BrowserModule,
		AppRoutingModule,
		MonthModule,
		NgbModule,
		FormsModule,
		HttpClientModule
	],
	providers: [DatePipe],
	bootstrap: [AppComponent]
})
export class AppModule { }
