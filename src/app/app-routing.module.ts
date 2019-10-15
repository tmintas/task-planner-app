import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [
	{
		path: '',
		redirectTo: 'month',
		pathMatch: 'full'
	},
	{
		path: 'month',
		loadChildren: () => import('./month/month.module').then(m => m.MonthModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy : 'always' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
