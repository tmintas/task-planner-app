import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './components/month/month.component';
import { EditTodoItemComponent } from 'app/to-dos/components/edit-todo-item/edit-todo-item.component';
import { DayTodoListComponent } from 'app/to-dos/components/day-todo-list/day-todo-list.component';

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: `${currentYear}/${currentMonth}`
	},
	{
		path: ':year',
		redirectTo : `:year/${currentMonth}`,
		pathMatch: 'full'
	},
	{
		path: ':year/:month',
		component: MonthComponent,
		children: 
		[
			{
				path: ':day',
				component: DayTodoListComponent
			},
			{
				path: ':day/edit/:itemId',
				component: EditTodoItemComponent
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CalendarRoutingModule { }
