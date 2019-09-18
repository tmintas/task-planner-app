import { NgModule } from '@angular/core';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';
import { DayComponent } from './day/day.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SharedModule } from '../shared/shared.module';
import { ToDosModule } from 'app/to-dos/to-dos.module';

@NgModule({
	declarations: [
		MonthComponent,
		DayComponent,
		CalendarComponent
	],
	imports: [
		MonthRoutingModule,
		SharedModule,
		ToDosModule
	],
	exports: [
		MonthComponent,
		CalendarComponent
	]
})
export class MonthModule { }
