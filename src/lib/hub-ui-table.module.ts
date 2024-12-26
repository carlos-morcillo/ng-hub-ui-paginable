import { ModuleWithProviders, NgModule } from '@angular/core';
import { PaginableTableConfig } from './interfaces/paginable-table-config';
import { PaginableTranslationService } from './services/paginable-translation.service';
import { PaginableService } from './services/paginable.service';
import { PaginateConfigService } from './services/paginate-config.service';

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
export class HubUITableModule {
	static forRoot(
		config?: PaginableTableConfig
	): ModuleWithProviders<HubUITableModule> {
		return {
			ngModule: HubUITableModule,
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
