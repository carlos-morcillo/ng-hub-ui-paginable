import { Inject, Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { locale as enLang } from '../assets/i18n/en';
import { locale as esLang } from '../assets/i18n/es';
import { PaginableTableConfig } from '../interfaces/paginable-table-config';
import { PaginableTableHeader } from '../interfaces/paginable-table-header';
import { PaginateConfigService } from './paginate-config.service';

@Injectable()
export class PaginateService {
	config: PaginableTableConfig = {};

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
		language: navigator.language
	};

	translations!: Record<string, string>;

	get mapping(): any {
		return this.config.mapping;
	}

	constructor(@Inject(PaginateConfigService) private _config) {
		this.initialize();
	}

	initialize() {
		_.defaultsDeep(this.config, this._config, this.default);
		const languages = [enLang, esLang].reduce((a, c) => {
			a[c.lang] = c.data;
			return a;
		}, {});

		this.setTranslation(
			languages[this.config.language as string] ?? languages['en']
		);
	}

	generateIdFromUrlAndHeaders(
		headers: Array<PaginableTableHeader | string> | string[]
	): number {
		const hashcode = function (text: string) {
			var hash = 0,
				i,
				chr,
				len;
			if (text.length === 0) return hash;
			for (i = 0, len = text.length; i < len; i++) {
				chr = text.charCodeAt(i);
				hash = (hash << 5) - hash + chr;
				hash |= 0; // Convert to 32bit integer
			}
			return hash;
		};

		return hashcode(
			[
				window.location.host,
				headers.map((o) =>
					o.constructor.name === 'Object' ? o.icon : o
				)
			].join()
		);
	}

	private translationSource = new Subject<any>();

	translationObserver = this.translationSource.asObservable();

	getTranslation(key: string): any {
		return this.translations[key as keyof typeof this.translations];
	}

	setTranslation(value: Translations) {
		this.translations = { ...this.translations, ...value };
		this.translationSource.next(this.translations);
	}
}

export interface Translations {
	[key: string]: string;
}
