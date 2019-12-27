import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthModule } from './month/month.module';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		SharedModule,
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
