import { ModuleWithProviders, NgModule } from '@angular/core';
import { HUB_TRANSLATION_CONFIG, HubTranslationService } from 'ng-hub-ui-utils';
import { locale as enLocale } from './assets/i18n/en';
import { locale as esLocale } from './assets/i18n/es';
import { locale as caLocale } from './assets/i18n/ca';
import { locale as euLocale } from './assets/i18n/eu';
import { locale as glLocale } from './assets/i18n/gl';
import { locale as astLocale } from './assets/i18n/ast';
import { locale as anLocale } from './assets/i18n/an';
import { locale as deLocale } from './assets/i18n/de';
import { locale as zhLocale } from './assets/i18n/zh';
import { locale as arLocale } from './assets/i18n/ar';
import { locale as ruLocale } from './assets/i18n/ru';
import { PaginableTableConfig } from './interfaces/paginable-table-config';
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

const PAGINABLE_DICTIONARIES = {
	[enLocale.lang]: enLocale.data,
	[esLocale.lang]: esLocale.data,
	[caLocale.lang]: caLocale.data,
	[euLocale.lang]: euLocale.data,
	[glLocale.lang]: glLocale.data,
	[astLocale.lang]: astLocale.data,
	[anLocale.lang]: anLocale.data,
	[deLocale.lang]: deLocale.data,
	[zhLocale.lang]: zhLocale.data,
	[arLocale.lang]: arLocale.data,
	[ruLocale.lang]: ruLocale.data
};

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
	static forRoot(config?: PaginableTableConfig): ModuleWithProviders<HubUITableModule> {
		return {
			ngModule: HubUITableModule,
			providers: [
				{
					provide: PaginableConfigService,
					useValue: config
				},
				PaginableService,
				{
					provide: HUB_TRANSLATION_CONFIG,
					useFactory: (paginableService: PaginableService) => ({
						dictionaries: PAGINABLE_DICTIONARIES,
						language: paginableService.config.language ?? 'en',
						fallbackLanguage: 'en'
					}),
					deps: [PaginableService]
				},
				HubTranslationService
			]
		};
	}
}
