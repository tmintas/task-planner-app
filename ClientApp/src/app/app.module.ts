import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule } from './month/calendar.module';
import { SharedModule } from './shared/shared.module';
import { NotificationService } from './shared/services/notification.service';
import { NotificatorComponent } from './shared/components/notificator/notificator.component';

@NgModule({
	declarations: [
		AppComponent,
		NotificatorComponent
	],
	imports: [
		StoreModule.forRoot([]),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({}),
		SharedModule,
		BrowserModule,
		AppRoutingModule,
		CalendarModule,
		NgbModule,
		FormsModule,
		HttpClientModule
	],
	providers: [DatePipe, NotificationService],
	bootstrap: [AppComponent]
})
export class AppModule { }
