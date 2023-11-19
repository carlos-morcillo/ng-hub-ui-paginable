import { CommonModule } from '@angular/common';
import {
	ModuleWithProviders,
	NgModule,
	Optional,
	SkipSelf
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MenuFilterComponent } from './components/menu-filter/menu-filter.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginableTableDropdownComponent } from './components/paginable-table-dropdown/paginable-table-dropdown.component';
import { PaginableTableRangeInputComponent } from './components/paginable-table-range-input/paginable-table-range-input.component';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ResizableComponent } from './components/resizable/resizable.component';
import { PaginableListItemDirective } from './directives/paginable-list-item.directive';
import { PaginableTableCellDirective } from './directives/paginable-table-cell.directive';
import { PaginableTableErrorDirective } from './directives/paginable-table-error.directive';
import { PaginableTableExpandingRowDirective } from './directives/paginable-table-expanding-row.directive';
import { PaginableTableFilterDirective } from './directives/paginable-table-filter.directive';
import { PaginableTableHeaderDirective } from './directives/paginable-table-header.directive';
import { PaginableTableLoadingDirective } from './directives/paginable-table-loading.directive';
import { PaginableTableNotFoundDirective } from './directives/paginable-table-not-found.directive';
import { PaginableTableRowDirective } from './directives/paginable-table-row.directive';
import { ResizableDirective } from './directives/resizable.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { PaginableTableConfig } from './interfaces/paginable-table-config';
import { PaginableListComponent } from './list/paginable-list/paginable-list.component';
import { GetPipe } from './pipes/get.pipe';
import { IsObjectPipe } from './pipes/is-object.pipe';
import { IsObservablePipe } from './pipes/is-observable.pipe';
import { IsStringPipe } from './pipes/is-string.pipe';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { PaginateConfigService } from './services/paginate-config.service';
import { PaginateService } from './services/paginate.service';
import { TranslatePipe } from './translate.pipe';

@NgModule({
	declarations: [
		PaginableTableComponent,
		PaginatorComponent,
		PaginableTableHeaderDirective,
		PaginableTableRowDirective,
		PaginableTableCellDirective,
		PaginableTableNotFoundDirective,
		PaginableTableLoadingDirective,
		PaginableTableExpandingRowDirective,
		GetPipe,
		IsObjectPipe,
		UcfirstPipe,
		IsStringPipe,
		PaginableTableDropdownComponent,
		ResizableComponent,
		ResizableDirective,
		PaginableTableErrorDirective,
		PaginableTableRangeInputComponent,
		PaginableTableFilterDirective,
		IsObservablePipe,
		TooltipDirective,
		ModalComponent,
		MenuFilterComponent,
		PaginableListComponent,
		PaginableListItemDirective
	],
	imports: [
		CommonModule,
		FormsModule,
		TranslatePipe,
		ReactiveFormsModule,
		DropdownComponent
	],
	exports: [
		PaginableTableComponent,
		PaginatorComponent,
		PaginableTableHeaderDirective,
		PaginableTableRowDirective,
		PaginableTableCellDirective,
		PaginableTableNotFoundDirective,
		PaginableTableLoadingDirective,
		PaginableTableErrorDirective,
		PaginableTableExpandingRowDirective,
		PaginableTableFilterDirective,
		ResizableDirective,
		GetPipe,
		IsObjectPipe,
		IsStringPipe,
		IsObservablePipe,
		ResizableComponent,
		PaginableTableErrorDirective,
		PaginableTableRangeInputComponent,
		TooltipDirective,
		ModalComponent,
		PaginableListComponent,
		PaginableListItemDirective
	],
	providers: [TranslateService]
})
export class NgPaginableModule {
	constructor(@Optional() @SkipSelf() parentModule?: NgPaginableModule) {
		if (parentModule) {
			console.warn('NgPaginableModule created multiple times');
		}
	}

	static forRoot(
		config?: PaginableTableConfig
	): ModuleWithProviders<NgPaginableModule> {
		return {
			ngModule: NgPaginableModule,
			providers: [
				PaginateService,
				{
					provide: PaginateConfigService,
					useValue: config
				}
			]
		};
	}
}
