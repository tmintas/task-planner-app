import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { IfHasItemsDirective } from './directives/has-items.directive';
import { ColoredTodoDirective } from 'app/to-dos/directives/colored-todo.directive';
import { DisplayTimePipe } from './pipes/display-time.pipe';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { FocusFirstInvalidOnsubmitDirective } from './directives/focus-first-invalid-onsubmit.directive';

@NgModule({
	declarations: [
		LoadingSpinnerComponent,
		ColoredTodoDirective,
		DisplayTimePipe,
		IfHasItemsDirective,
		HomeComponent,
		LandingPageComponent,
		EqualValidatorDirective,
		FocusFirstInvalidOnsubmitDirective,
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
		EqualValidatorDirective,
		FocusFirstInvalidOnsubmitDirective,
	]
})
export class SharedModule { 
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas);
		library.addIconPacks(far);
	}
}
