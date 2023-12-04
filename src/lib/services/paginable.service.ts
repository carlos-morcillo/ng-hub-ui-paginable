import { Inject, Injectable, Optional } from '@angular/core';
import { DEFAULT_PAGINABLE_CONFIG } from '../constants/defaults';
import { PaginableTableConfig } from '../interfaces/paginable-table-config';
import { mergeDeep } from '../utils';
import { PaginateConfigService } from './paginate-config.service';

@Injectable()
export class PaginableService {
	config!: Required<PaginableTableConfig>;

	get mapping(): any {
		return this.config.mapping;
	}

	constructor(
		@Optional()
		@Inject(PaginateConfigService)
		private _config = DEFAULT_PAGINABLE_CONFIG
	) {
		this.initialize();
	}

	initialize() {
		this.config = mergeDeep(DEFAULT_PAGINABLE_CONFIG, this._config);
	}
}
