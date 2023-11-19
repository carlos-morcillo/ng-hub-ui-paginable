import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { locale as enLang } from '../assets/i18n/en';
import { locale as esLang } from '../assets/i18n/es';
import { PaginableService } from './paginable.service';

@Injectable()
export class PaginableTranslationService {
	private _paginableSvc = inject(PaginableService);

	translations!: Record<string, string>;

	private translationSource = new Subject<any>();

	translationObserver = this.translationSource.asObservable();

	constructor() {
		console.log('PaginableTranslationService');
	}

	initialize() {
		const languages = [enLang, esLang].reduce((a, c) => {
			a[c.lang] = c.data;
			return a;
		}, {});

		this.setTranslation(
			languages[this._paginableSvc.config.language as string] ??
				languages['en']
		);
	}

	getTranslation(key: string): any {
		return this.translations[key as keyof typeof this.translations];
	}

	setTranslation(value: Record<string, string>) {
		this.translations = { ...this.translations, ...value };
		this.translationSource.next(this.translations);
	}
}
