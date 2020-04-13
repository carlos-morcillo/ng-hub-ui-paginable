import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbTableSorterPaginatorComponent } from './components/nb-table-sorter-paginator/nb-table-sorter-paginator.component';
import { GetPipe } from './get.pipe';
import { IsObjectPipe } from './is-object.pipe';
import { IsStringPipe } from './is-string.pipe';
import { NbTableSorterHeaderDirective } from './nb-table-sorter-header.directive';
import { NbTableSorterNotFoundDirective } from './nb-table-sorter-not-found.directive';
import { NbTableSorterRowDirective } from './nb-table-sorter-row.directive';
import { TableSorterComponent } from './table-sorter.component';
import { UcfirstPipe } from './ucfirst.pipe';
import { NbTableSorterCellDirective } from './nb-table-sorter-cell.directive';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NbTableSorterService } from './services/nb-table-sorter.service';
import { NbTableSorterConfig } from './models/nb-table-sorter-config';
import { NbTableSorterConfigService } from './services/nb-table-sorter-config.service';

@NgModule({
	declarations: [
		TableSorterComponent,
		NbTableSorterHeaderDirective,
		NbTableSorterRowDirective,
		NbTableSorterCellDirective,
		GetPipe,
		NbTableSorterNotFoundDirective,
		IsObjectPipe,
		UcfirstPipe,
		IsStringPipe,
		NbTableSorterPaginatorComponent
	],
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [
		TableSorterComponent,
		NbTableSorterHeaderDirective,
		NbTableSorterRowDirective,
		NbTableSorterCellDirective,
		GetPipe,
		NbTableSorterNotFoundDirective,
		IsObjectPipe,
		UcfirstPipe,
		IsStringPipe,
		NbTableSorterPaginatorComponent
	]

})
export class NbTableSorterModule {

	static forRoot(config: NbTableSorterConfig): ModuleWithProviders {
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