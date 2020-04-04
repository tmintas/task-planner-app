// In a custom serializer ts file
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface CustomRouterState {
  url : string;
  params : Params;
  queryParams : Params;
}

export class CustomSerializer implements RouterStateSerializer<CustomRouterState> {
  public serialize(routerState : RouterStateSnapshot) : CustomRouterState {
	let route = routerState.root;

	while (route.firstChild) {
		route = route.firstChild;
	}

	const {
		url,
		root: { queryParams },
	} = routerState;
	const { params } = route;

	// Only return an object including the URL, params and query params
	// instead of the entire snapshot
	return { url, params, queryParams };
  }
}
