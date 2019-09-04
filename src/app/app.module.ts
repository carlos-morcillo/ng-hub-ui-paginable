import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NbTableSorterModule } from './modules/nb-table-sorter/nb-table-sorter.module';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		NbTableSorterModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
