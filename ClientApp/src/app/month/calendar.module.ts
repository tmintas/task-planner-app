import { NgModule } from '@angular/core';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MonthComponent } from './components/month/month.component';
import { DayComponent } from './components/day/day.component';
import { SharedModule } from '../shared/shared.module';
import { ToDosModule } from 'app/to-dos/to-dos.module';
import { StoreModule } from '@ngrx/store';

import { CALENDAR_FEATURE_KEY } from '@states/calendar';
import * as fromCalendarReducers from '@reducers/calendar';

@NgModule({
	declarations: [
		MonthComponent,
		DayComponent,
	],
	imports: [
		StoreModule.forFeature(CALENDAR_FEATURE_KEY, fromCalendarReducers.CalendarReducer),
		CalendarRoutingModule,
		SharedModule,
		ToDosModule
	],
	exports: [
		MonthComponent,
		ToDosModule
	]
})
export class CalendarModule { }
