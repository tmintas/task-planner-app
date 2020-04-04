import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ImportanceBgDirective } from 'app/to-dos/directives/importance-bg.directive';
import { DisplayTimePipe } from './pipes/display-time.pipe';

@NgModule({
	declarations: [
		LoadingSpinnerComponent,
		ImportanceBgDirective,
		DisplayTimePipe,
	],
	imports: [
		CommonModule,
	],
	exports: [
		CommonModule,
		FontAwesomeModule,
		LoadingSpinnerComponent,
		ImportanceBgDirective,
		DisplayTimePipe
	]
})
export class SharedModule { }
