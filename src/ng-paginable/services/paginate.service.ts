import { Injectable, Inject } from '@angular/core';
import { PaginateConfigService } from './paginate-config.service';
import { PaginableTableConfig } from '../interfaces/paginable-table-config';
import * as _ from 'lodash';
import { PaginableTableHeader } from '../interfaces/paginable-table-header';

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
		}
	};

	public get mapping(): any {
		return this.config.mapping;
	}


	constructor(@Inject(PaginateConfigService) private _config) {
		this.initialize();
	}

	initialize() {
		_.defaultsDeep(this.config, this._config, this.default);
	}

	generateIdFromUrlAndHeaders(headers: PaginableTableHeader[] | string[]): number {
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
