import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './month.component';
import { EditTodoItemComponent } from 'app/to-dos/components/edit-todo-item/edit-todo-item.component';

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
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MonthRoutingModule { }
