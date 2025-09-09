import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { locale as enLang } from '../assets/i18n/en';
import { locale as esLang } from '../assets/i18n/es';
import { PaginableService } from './paginable.service';
import { getValue } from '../utils';

@Injectable()
export class PaginableTranslationService {
	#paginableSvc = inject(PaginableService);

	defaultTranslations: Record<string, string | any> = [enLang, esLang].reduce<Record<string, any>>(
		(acc, c) => {
			acc[c.lang] = c.data;
			return acc;
		},
		{}
	);

	translations!: Record<string, string>;

	private translationSource = new Subject<any>();

	translationObserver = this.translationSource.asObservable();

	constructor() {
		this.initialize();
	}

	initialize() {
		this.setTranslations(
			this.defaultTranslations[this.#paginableSvc.config.language] ??
				this.defaultTranslations['en']
		);
	}

	/**
	 * Retrieves a value from a translations object based on a given key.
	 *
	 * @param {string} key - The `key` parameter in the `getTranslation` function is a string that represents the unique identifier or
	 * key for the translation you want to retrieve from the translations object. This key is used to look up the corresponding
	 * translation value in the translations object.
	 *
	 * @returns The value associated with the provided `key` from the `translations` object.
	 */
	getTranslation(key: string): any {
		return getValue(this.translations, key);
	}

	/**
	 * Merges the default English translations with the provided translations and updates the translation source.
	 *
	 * @param {Record<string, string> | any} translations - The `translations` parameter in the `setTranslation` method is a parameter that accepts
	 * either an object of type `Record<string, string>` or any other type. If no value is provided, it defaults to an empty object
	 * `{}`.
	 */
	setTranslations(translations: Record<string, string> | any = {}) {
		this.translations = { ...enLang, ...translations };
		this.translationSource.next(this.translations);
	}
}
