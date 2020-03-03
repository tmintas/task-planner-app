import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './shared/utils/custom-router-serializer';

const routes : Routes = [
	{
		path: '',
		redirectTo: 'calendar',
		pathMatch: 'full'
	},
	{
		path: 'calendar',
		loadChildren: () => import('./month/month.module').then(m => m.MonthModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { paramsInheritanceStrategy : 'always' }),
		StoreModule.forFeature('router', routerReducer),
		StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
