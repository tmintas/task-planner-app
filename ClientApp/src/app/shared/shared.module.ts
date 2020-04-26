import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { IfHasItemsDirective } from './directives/has-items.directive';
import { ColoredTodoDirective } from 'app/to-dos/directives/colored-todo.directive';

import { DisplayTimePipe } from './pipes/display-time.pipe';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
	declarations: [
		LoadingSpinnerComponent,
		ColoredTodoDirective,
		DisplayTimePipe,
		IfHasItemsDirective,
		SafePipe
	],
	imports: [
		CommonModule,
	],
	exports: [
		CommonModule,
		FontAwesomeModule,
		LoadingSpinnerComponent,
		ColoredTodoDirective,
		IfHasItemsDirective,
		DisplayTimePipe,
		SafePipe
	]
})
export class SharedModule { }
