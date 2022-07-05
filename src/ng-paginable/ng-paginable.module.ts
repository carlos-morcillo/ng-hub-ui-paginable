import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GetPipe } from './pipes/get.pipe';
import { IsObjectPipe } from './pipes/is-object.pipe';
import { IsStringPipe } from './pipes/is-string.pipe';
import { PaginableTableHeaderDirective } from './directives/paginable-table-header.directive';
import { PaginableTableNotFoundDirective } from './directives/paginable-table-not-found.directive';
import { PaginableTableRowDirective } from './directives/paginable-table-row.directive';
import { PaginableTableComponent } from './components/paginable-table/paginable-table.component';
import { UcfirstPipe } from './pipes/ucfirst.pipe';
import { PaginableTableCellDirective } from './directives/paginable-table-cell.directive';
import { PaginateService } from './services/paginate.service';
import { PaginableTableConfig } from './interfaces/paginable-table-config';
import { PaginateConfigService } from './services/paginate-config.service';
import { PaginableTableExpandingRowDirective } from './directives/paginable-table-expanding-row.directive';
import { TranslateModule } from '@ngx-translate/core';
import { ResizableDirective } from './directives/resizable.directive';
import { ResizableComponent } from './components/resizable/resizable.component';
import { PaginableTableLoadingDirective } from './directives/paginable-table-loading.directive';
import { PaginableTableErrorDirective } from './directives/paginable-table-error.directive';
import { PaginableTableRangeInputComponent } from './components/paginable-table-range-input/paginable-table-range-input.component';
import { PaginableTableFilterDirective } from './directives/paginable-table-filter.directive';
import { IsObservablePipe } from './pipes/is-observable.pipe';
import { ViewSelectorComponent } from './components/view-selector/view-selector.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { ModalComponent } from './components/modal/modal.component';
import { TypeaheadModule } from './modules/typeahead/typeahead.module';
import { PaginableTableDropdownComponent } from './components/paginable-table-dropdown/paginable-table-dropdown.component';

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
        ViewSelectorComponent,
        TooltipDirective,
        ModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        TypeaheadModule
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
        UcfirstPipe,
        IsStringPipe,
        IsObservablePipe,
        ResizableComponent,
        PaginableTableErrorDirective,
        PaginableTableRangeInputComponent,
        ViewSelectorComponent,
        TooltipDirective,
        ModalComponent
    ]
})
export class NgPaginableModule {

	static forRoot(config?: PaginableTableConfig): ModuleWithProviders<NgPaginableModule> {
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
