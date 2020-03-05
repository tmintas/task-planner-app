import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './shared/utils/custom-router-serializer';
import * as fromRouterState from '@states/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './store/effects/router.effects';

const routes : Routes = [
	{
		path: '',
		redirectTo: 'calendar',
		pathMatch: 'full'
	},
	{
		path: 'calendar',
		loadChildren: () => import('./month/calendar.module').then(m => m.CalendarModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { paramsInheritanceStrategy : 'always' }),
		StoreModule.forFeature(fromRouterState.ROUTER_FEATURE_KEY, routerReducer),
		EffectsModule.forFeature([RouterEffects]),
		StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
