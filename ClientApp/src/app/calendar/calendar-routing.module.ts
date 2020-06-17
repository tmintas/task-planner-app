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
					// {
					// 	path: '',
					// 	redirectTo: 'landing',
					// 	pathMatch: 'full'
					// },
					{
						path: 'landing',
						component: LandingPageComponent,
						canActivate : [ AuthGuard ],
						data : { requiresToBeAuthenticated : false }
					},
					{
						path: 'register',
						component: RegisterFormComponent,
						canActivate : [ AuthGuard ],
						data : { requiresToBeAuthenticated : false }
					},
					{
						path: 'login',
						component: LoginFormComponent,
						canActivate : [ AuthGuard ],
						data : { requiresToBeAuthenticated : false }
					},
					{
						path: 'home',
						component: HomeComponent,
						canActivate : [ AuthGuard ],
						data : { requiresToBeAuthenticated : true }
					},
					{
						path: ':day',
						component: DayTodoListComponent,
						canActivate : [ AuthGuard ],
						data : { requiresToBeAuthenticated : true, error : 'Please login to view items' }
					},
					{
						path: ':day/edit/:itemId',
						component: EditTodoItemComponent,
						canActivate : [ AuthGuard ],
						data : { requiresToBeAuthenticated : true, error : 'Please login to add or edit items' }
					}
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
