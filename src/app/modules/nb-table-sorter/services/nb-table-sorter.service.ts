import { Injectable, Inject } from '@angular/core';
import { NbTableSorterConfigService } from './nb-table-sorter-config.service';
import { NbTableSorterConfig } from '../interfaces/nb-table-sorter-config';
import * as _ from 'lodash';
import { NbTableSorterHeader } from '../interfaces/nb-table-sorter-header';

@Injectable()
export class NbTableSorterService {


	config: NbTableSorterConfig = {};

	default: NbTableSorterConfig = {
		theme: null,
		mapping: {
			currentPage: 'currentPage',
			lastPage: 'lastPage',
			data: 'data',
			total: 'total'
		},
		views: {
			key: 'nb-table-sorter_view_'
		}
	};

	public get mapping(): any {
		return this.config.mapping;
	}


	constructor(@Inject(NbTableSorterConfigService) private _config) {
		this.initialize();
	}

	initialize() {
		_.defaultsDeep(this.config, this._config, this.default);
	}

	generateIdFromUrlAndHeaders(headers: NbTableSorterHeader[] | string[]): number {
		const hashcode = function (text: string) {
			var hash = 0, i, chr, len;
			if (text.length === 0) return hash;
			for (i = 0, len = text.length; i < len; i++) {
				chr = text.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0; // Convert to 32bit integer
			}
			return hash;
		}

		return hashcode([
			window.location.host,
			headers.map(o => o.constructor.name === 'Object' ? o.icon : o)
		].join());
	}
}
