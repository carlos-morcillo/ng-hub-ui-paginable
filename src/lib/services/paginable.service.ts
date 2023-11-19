import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { locale as enLang } from '../assets/i18n/en';
import { locale as esLang } from '../assets/i18n/es';
import { PaginableTableConfig } from '../interfaces/paginable-table-config';
import { mergeDeep } from '../utis';
import { PaginateConfigService } from './paginate-config.service';

@Injectable()
export class PaginableService {
	config!: Required<PaginableTableConfig>;

	default: PaginableTableConfig = {
		theme: null,
		mapping: {
			currentPage: 'currentPage',
			lastPage: 'lastPage',
			data: 'data',
			total: 'total'
		},
		views: {
			key: 'paginable-table_view_'
		},
		language: navigator.language.split('-').at(0) ?? 'en'
	};

	translations!: Record<string, string>;

	private translationSource = new Subject<any>();

	translationObserver = this.translationSource.asObservable();

	get mapping(): any {
		return this.config.mapping;
	}

	constructor(@Inject(PaginateConfigService) private _config) {
		console.log('PaginableService');
		this.initialize();
	}

	initialize() {
		this.config = mergeDeep(this._config, this.default);
		const languages = [enLang, esLang].reduce((a, c) => {
			a[c.lang] = c.data;
			return a;
		}, {});

		this.setTranslation(
			languages[this.config.language as string] ?? languages['en']
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
