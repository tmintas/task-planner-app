import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthRoutingModule } from './month-routing.module';
import { MonthComponent } from './month.component';
import { DayComponent } from './day/day.component';

@NgModule({
	declarations: [
		MonthComponent,
		DayComponent
	],
	imports: [
		CommonModule,
		MonthRoutingModule
	],
	exports: [
		MonthComponent
	]
})
export class MonthModule { }
