import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './month.component';
import { EditTodoItemComponent } from 'app/to-dos/components/edit-todo-item/edit-todo-item.component';
import { DayTodoListComponent } from 'app/to-dos/components/day-todo-list/day-todo-list.component';
import { DayTodoListResolverService } from 'app/to-dos/resolvers/day-todo-list.resolver.service';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/1'
	},
	{
		path: ':monthNumber',
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
