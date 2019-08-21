import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';
import { DayComponent } from './day/day.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
	declarations: [
		MonthComponent,
		DayComponent,
		CalendarComponent
	],
	imports: [
		CommonModule,
		MonthRoutingModule
	],
	exports: [
		MonthComponent,
		CalendarComponent
	]
})
export class MonthModule { }
