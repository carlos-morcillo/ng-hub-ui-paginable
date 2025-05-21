import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginableTableConfig } from './interfaces/paginable-table-config';
import { PaginableTranslationService } from './services/paginable-translation.service';
import { PaginableService } from './services/paginable.service';
import { PaginableConfigService } from './services/paginate-config.service';
// import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
// import { PaginableTableHeaderDirective } from './directives/paginable-table-header.directive';
// import { PaginableTableRowDirective } from './directives/paginable-table-row.directive';
// import { PaginableTableCellDirective } from './directives/paginable-table-cell.directive';
// import { PaginableTableLoadingDirective } from './directives/paginable-table-loading.directive';
// import { PaginableTableErrorDirective } from './directives/paginable-table-error.directive';
// import { PaginableTableExpandingRowDirective } from './directives/paginable-table-expanding-row.directive';
// import { PaginableTableFilterDirective } from './directives/paginable-table-filter.directive';

@NgModule({
	imports: [
		// PaginableTableComponent,
		// PaginableTableHeaderDirective,
		// PaginableTableRowDirective,
		// PaginableTableCellDirective,
		// PaginableTableLoadingDirective,
		// PaginableTableErrorDirective,
		// PaginableTableExpandingRowDirective,
		// PaginableTableFilterDirective
	],
	exports: [
		// PaginableTableComponent,
		// PaginableTableHeaderDirective,
		// PaginableTableRowDirective,
		// PaginableTableCellDirective,
		// PaginableTableLoadingDirective,
		// PaginableTableErrorDirective,
		// PaginableTableExpandingRowDirective,
		// PaginableTableFilterDirective
	],
	providers: []
})
export class TableModule {
	static forRoot(
		config?: PaginableTableConfig
	): ModuleWithProviders<TableModule> {
		return {
			ngModule: TableModule,
			providers: [
				{
					provide: PaginableConfigService,
					useValue: config
				},
				PaginableService,
				PaginableTranslationService
			]
		};
	}
}
