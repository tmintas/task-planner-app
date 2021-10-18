import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { RouterEffects } from './store/effects/router.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './shared/utils/custom-router-serializer';

const routes : Routes = [
	{
		path: '',
		redirectTo: 'calendar',
		pathMatch: 'full'
	},
	{
		path: 'calendar',
		loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always', relativeLinkResolution: 'legacy' }),
		StoreRouterConnectingModule.forRoot(),
		EffectsModule.forFeature([RouterEffects]),
	],
	exports: [RouterModule],
	providers: [
		{ 
			provide: RouterStateSerializer, 
			useClass : CustomSerializer
		},
	]

})
export class AppRoutingModule { }
