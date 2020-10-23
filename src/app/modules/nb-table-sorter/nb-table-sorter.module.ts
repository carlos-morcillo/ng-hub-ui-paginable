import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbTableSorterPaginatorComponent } from './components/nb-table-sorter-paginator/nb-table-sorter-paginator.component';
import { GetPipe } from './pipes/get.pipe';
import { IsObjectPipe } from './pipes/is-object.pipe';
import { IsStringPipe } from './pipes/is-string.pipe';
import { NbTableSorterHeaderDirective } from './directives/nb-table-sorter-header.directive';
import { NbTableSorterNotFoundDirective } from './directives/nb-table-sorter-not-found.directive';
import { NbTableSorterRowDirective } from './directives/nb-table-sorter-row.directive';
import { TableSorterComponent } from './components/nb-table-sorter/table-sorter.component';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { NbTableSorterCellDirective } from './directives/nb-table-sorter-cell.directive';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NbTableSorterService } from './services/nb-table-sorter.service';
import { NbTableSorterConfig } from './interfaces/nb-table-sorter-config';
import { NbTableSorterConfigService } from './services/nb-table-sorter-config.service';
import { NbTableSorterExpandingRowDirective } from './directives/nb-table-sorter-expanding-row.directive';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service'

@NgModule({
	declarations: [
		TableSorterComponent,
		NbTableSorterPaginatorComponent,
		NbTableSorterHeaderDirective,
		NbTableSorterRowDirective,
		NbTableSorterCellDirective,
		NbTableSorterNotFoundDirective,
		NbTableSorterExpandingRowDirective,
		GetPipe,
		IsObjectPipe,
		UcfirstPipe,
		IsStringPipe,
	],
	imports: [
		CommonModule,
		FormsModule,
		TranslateModule.forChild()
	],
	exports: [
		TableSorterComponent,
		NbTableSorterPaginatorComponent,
		NbTableSorterHeaderDirective,
		NbTableSorterRowDirective,
		NbTableSorterCellDirective,
		NbTableSorterNotFoundDirective,
		NbTableSorterExpandingRowDirective,
		GetPipe,
		IsObjectPipe,
		UcfirstPipe,
		IsStringPipe
	]
})
export class NbTableSorterModule {

	static forRoot(config?: NbTableSorterConfig): ModuleWithProviders {
		return {
			ngModule: NbTableSorterModule,
			providers: [
				NbTableSorterService,
				{
					provide: NbTableSorterConfigService,
					useValue: config
				}
			]
		}
	}
}