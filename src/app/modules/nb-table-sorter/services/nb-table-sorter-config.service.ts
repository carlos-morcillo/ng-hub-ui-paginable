import { InjectionToken } from '@angular/core';
import { NbTableSorterConfig } from '../models/nb-table-sorter-config';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
// tslint:disable-next-line: variable-name
export const NbTableSorterConfigService = new InjectionToken<NbTableSorterConfig>('NbTableSorterConfig');
