import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { PaginableTableCellDirective } from './directives/paginable-table-cell.directive';
import { PaginableTableErrorDirective } from './directives/paginable-table-error.directive';
import { PaginableTableExpandingRowDirective } from './directives/paginable-table-expanding-row.directive';
import { PaginableTableFilterDirective } from './directives/paginable-table-filter.directive';
import { PaginableTableHeaderDirective } from './directives/paginable-table-header.directive';
import { PaginableTableLoadingDirective } from './directives/paginable-table-loading.directive';
import { PaginableTableRowDirective } from './directives/paginable-table-row.directive';
import { PaginableTableConfig } from './interfaces/paginable-table-config';
import { PaginableTranslationService } from './services/paginable-translation.service';
import { PaginableService } from './services/paginable.service';
import { PaginateConfigService } from './services/paginate-config.service';

@NgModule({
	imports: [
		PaginableTableComponent,
		PaginableTableHeaderDirective,
		PaginableTableRowDirective,
		PaginableTableCellDirective,
		PaginableTableLoadingDirective,
		PaginableTableErrorDirective,
		PaginableTableExpandingRowDirective,
		PaginableTableFilterDirective
	],
	exports: [
		PaginableTableComponent,
		PaginableTableHeaderDirective,
		PaginableTableRowDirective,
		PaginableTableCellDirective,
		PaginableTableLoadingDirective,
		PaginableTableErrorDirective,
		PaginableTableExpandingRowDirective,
		PaginableTableFilterDirective
	],
	providers: []
})
export class NgPaginableModule {
	static forRoot(
		config?: PaginableTableConfig
	): ModuleWithProviders<NgPaginableModule> {
		return {
			ngModule: NgPaginableModule,
			providers: [
				{
					provide: PaginateConfigService,
					useValue: config
				},
				PaginableService,
				PaginableTranslationService
			]
		};
	}
}
