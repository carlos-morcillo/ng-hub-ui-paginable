import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
	lang: string;
	// tslint:disable-next-line:ban-types
	data: Object;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	private _translateSvc = inject(TranslateService);

	// Private properties
	private langIds: any = [];

	/**
	 * Takes in an array of Locale objects, appends the translations for each locale to the translation service, and adds the
	 * new languages to the list of available languages.
	 *
	 * @param {Locale[]} args - An array of Locale objects.
	 */
	addTranslations(...args: Locale[]): void {
		// const locales = [...args];
		// locales.forEach((locale) => {
		// 	// use setTranslation() with the third argument set to true
		// 	// to append translations instead of replacing them
		// 	this._translateSvc.setTranslation(locale.lang, locale.data, true);
		// 	this.langIds.push(locale.lang);
		// });
		// // add new languages to the list
		// this._translateSvc.addLangs(this.langIds);
	}
}
