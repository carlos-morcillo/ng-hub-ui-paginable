import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { NbTableSorterModule } from './modules/nb-table-sorter/nb-table-sorter.module';

const routes: Routes = [
	{ path: '', loadChildren: () => import('./examples/examples.module').then(m => m.ExamplesModule) },
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserAnimationsModule,
		TranslateModule.forRoot(),
		NbTableSorterModule.forRoot({
			mapping: {
				currentPage: 'currentPage',
				lastPage: 'lastPage',
			}
		}),
		HttpClientModule,
		RouterModule.forRoot(routes)
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
