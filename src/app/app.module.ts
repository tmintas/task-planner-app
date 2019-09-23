import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonthModule } from './month/month.module';
import { ToDosModule } from './to-dos/to-dos.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MonthModule,
		ToDosModule,
		NgbModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
