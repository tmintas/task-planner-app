import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './month.component';
import { EditTodoItemComponent } from 'app/to-dos/components/edit-todo-item/edit-todo-item.component';
import { DayTodoListComponent } from 'app/to-dos/components/day-todo-list/day-todo-list.component';
import { DayTodoListResolverService } from 'app/to-dos/resolvers/day-todo-list.resolver.service';

import * as fromCalendarState from '@states/calendar';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: `${fromCalendarState.CALENDAR_INITIAL_STATE.selectedYear}/${fromCalendarState.CALENDAR_INITIAL_STATE.selectedMonth}`
	},
	{
		path: ':year/:month',
		component: MonthComponent,
		children: 
		[
			{
				path: ':dayNumber/add',
				component: EditTodoItemComponent
			},
			{
				path: ':dayNumber/items-list',
				component: DayTodoListComponent,
				resolve: 
				{
					todos :	DayTodoListResolverService
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [DayTodoListResolverService]
})
export class MonthRoutingModule { }
