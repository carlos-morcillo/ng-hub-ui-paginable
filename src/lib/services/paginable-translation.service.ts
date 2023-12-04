import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { locale as enLang } from '../assets/i18n/en';
import { locale as esLang } from '../assets/i18n/es';
import { PaginableService } from './paginable.service';
import { getValue } from '../utils';

@Injectable()
export class PaginableTranslationService {
	private _paginableSvc = inject(PaginableService);

	translations!: Record<string, string>;

	private translationSource = new Subject<any>();

	translationObserver = this.translationSource.asObservable();

	constructor() {
		this.initialize();
	}

	initialize() {
		const languages = [enLang, esLang].reduce((a, c) => {
			a[c.lang] = c.data;
			return a;
		}, {});

		this.setTranslation(
			languages[this._paginableSvc.config.language] ?? languages['en']
		);
	}

	getTranslation(key: string): any {
		return getValue(this.translations, key);
	}

	setTranslation(value: Record<string, string>) {
		this.translations = { ...this.translations, ...value };
		this.translationSource.next(this.translations);
	}
}
