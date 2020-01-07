import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NbTableSorterModule } from './modules/nb-table-sorter/nb-table-sorter.module';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

const routes: Routes = [
	{ path: '', loadChildren: () => import('./examples/examples.module').then(m => m.ExamplesModule) },
];

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~10KB)
 */
export function getHighlightLanguages() {
	return {
		typescript: () => import('highlight.js/lib/languages/typescript'),
		xml: () => import('highlight.js/lib/languages/xml')
	};
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		NbTableSorterModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		HighlightModule

	],
	providers: [
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				languages: getHighlightLanguages()

			}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
