import { NgModule } from '@angular/core';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';
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
		MonthRoutingModule,
		SharedModule,
		ToDosModule
	],
	exports: [
		MonthComponent,
		ToDosModule
	]
})
export class MonthModule { }
