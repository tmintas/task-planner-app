import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './month.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/1'
	},
	{
		path: ':monthNumber',
		component: MonthComponent,
		children: [
			{
				path: 'add',
				component: DayComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MonthRoutingModule { }
