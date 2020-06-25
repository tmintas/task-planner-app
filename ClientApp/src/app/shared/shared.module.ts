import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }from '@angular/router';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { IfHasItemsDirective } from './directives/has-items.directive';
import { ColoredTodoDirective } from 'app/to-dos/directives/colored-todo.directive';

import { DisplayTimePipe } from './pipes/display-time.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { EqualValidatorDirective } from './directives/equal-validator.directive';

@NgModule({
	declarations: [
		LoadingSpinnerComponent,
		ColoredTodoDirective,
		DisplayTimePipe,
		IfHasItemsDirective,
		SafePipe,
		HomeComponent,
		LandingPageComponent,
		EqualValidatorDirective,
	],
	imports: [
		CommonModule,
		RouterModule,
		FontAwesomeModule
	],
	exports: [
		CommonModule,
		FontAwesomeModule,
		LoadingSpinnerComponent,
		HomeComponent,
		ColoredTodoDirective,
		IfHasItemsDirective,
		DisplayTimePipe,
		SafePipe,
		EqualValidatorDirective
	]
})
export class SharedModule { }
