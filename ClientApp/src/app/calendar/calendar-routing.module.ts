import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonthComponent } from './components/month/month.component';
import { EditTodoItemComponent } from 'app/to-dos/components/edit-todo-item/edit-todo-item.component';
import { DayTodoListComponent } from 'app/to-dos/components/day-todo-list/day-todo-list.component';
import { RegisterFormComponent } from 'app/auth/components/register-form/register-form.component';
import { LoginFormComponent } from 'app/auth/components/login-form/login-form.component';
import { HomeComponent } from 'app/shared/home/home.component';
import { LandingPageComponent } from 'app/shared/components/landing-page/landing-page.component';
import { CalendarComponent } from './calendar.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: CalendarComponent,
		children: [
			{
				path: ':year/:month',
				component: MonthComponent,
				children: 
				[
					{
						path: '',
						redirectTo: 'landing',
						pathMatch: 'full'
					},
					{
						path: 'landing',
						component: LandingPageComponent
					},
					{
						path: 'home',
						component: HomeComponent,
						canActivate : [ AuthGuard ]
					},
					{
						path: 'register',
						component: RegisterFormComponent
					},
					{
						path: 'login',
						component: LoginFormComponent
					},
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
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CalendarRoutingModule { }
