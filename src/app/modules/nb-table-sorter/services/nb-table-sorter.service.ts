import { Injectable, Inject } from '@angular/core';
import { NbTableSorterConfigService } from './nb-table-sorter-config.service';
import { NbTableSorterConfig } from '../interfaces/nb-table-sorter-config';
import * as _ from 'lodash';

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
}
