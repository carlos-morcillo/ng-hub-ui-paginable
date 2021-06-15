import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NbTableSorterModule } from '../modules/nb-table-sorter';
import { BatchActionsComponent } from './components/batch-actions/batch-actions.component';
import { ClientPaginationComponent } from './components/client-pagination/client-pagination.component';
import { CustomCellsComponent } from './components/custom-cells/custom-cells.component';
import { CustomHeadersComponent } from './components/custom-headers/custom-headers.component';
import { CustomNoDataMessageComponent } from './components/custom-no-data-message/custom-no-data-message.component';
import { CustomRowsPerPageComponent } from './components/custom-rows-per-page/custom-rows-per-page.component';
import { CustomRowsComponent } from './components/custom-rows/custom-rows.component';
import { ExpandingRowsComponent } from './components/expanding-rows/expanding-rows.component';
import { HoverableRowsComponent } from './components/hoverable-rows/hoverable-rows.component';
import { NotPaginatedComponent } from './components/not-paginated/not-paginated.component';
import { PaginationDownComponent } from './components/pagination-down/pagination-down.component';
import { PaginationInfoComponent } from './components/pagination-info/pagination-info.component';
import { PaginationOnBothSitesComponent } from './components/pagination-on-both-sites/pagination-on-both-sites.component';
import { PaginationUpComponent } from './components/pagination-up/pagination-up.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { RowsWithActionsComponent } from './components/rows-with-actions/rows-with-actions.component';
import { SelectableComponent } from './components/selectable/selectable.component';
import { ServerPaginationComponent } from './components/server-pagination/server-pagination.component';
import { SortableComponent } from './components/sortable/sortable.component';
import { StickyColumnsComponent } from './components/sticky-columns/sticky-columns.component';
import { WithoutSearchComponent } from './components/without-search/without-search.component';
import { AdvancedFilteringComponent } from './components/advanced-filtering/advanced-filtering.component';
import { CustomLoadingComponent } from './components/custom-loading/custom-loading.component';
import { ErrorComponent } from './components/error/error.component';
import { CustomErrorComponent } from './components/custom-error/custom-error.component';


const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'server-pagination' },
	{ path: 'server-pagination', component: ServerPaginationComponent },
	{ path: 'client-pagination', component: ClientPaginationComponent },
	{ path: 'rows-with-actions', component: RowsWithActionsComponent },
	{ path: 'custom-headers', component: CustomHeadersComponent },
	{ path: 'sortable', component: SortableComponent },
	{ path: 'pagination-up', component: PaginationUpComponent },
	{ path: 'pagination-down', component: PaginationDownComponent },
	{ path: 'pagination-on-both-sites', component: PaginationOnBothSitesComponent },
	{ path: 'pagination-info', component: PaginationInfoComponent },
	{ path: 'without-search', component: WithoutSearchComponent },
	{ path: 'custom-no-data-message', component: CustomNoDataMessageComponent },
	{ path: 'custom-rows', component: CustomRowsComponent },
	{ path: 'custom-cells', component: CustomCellsComponent },
	{ path: 'expanding-rows', component: ExpandingRowsComponent },
	{ path: 'selectable', component: SelectableComponent },
	{ path: 'custom-rows-per-page', component: CustomRowsPerPageComponent },
	{ path: 'not-paginated', component: NotPaginatedComponent },
	{ path: 'sticky-columns', component: StickyColumnsComponent },
	{ path: 'responsive', component: ResponsiveComponent },
	{ path: 'batch-actions', component: BatchActionsComponent },
	{ path: 'hoverable-rows', component: HoverableRowsComponent },
	{ path: 'advanced-filtering', component: AdvancedFilteringComponent },
	{ path: 'custom-loading', component: CustomLoadingComponent },
	{ path: 'error', component: ErrorComponent },
	{ path: 'custom-error', component: CustomErrorComponent }
];

@NgModule({
	declarations: [
		ServerPaginationComponent,
		ClientPaginationComponent,
		RowsWithActionsComponent,
		CustomHeadersComponent,
		SortableComponent,
		PaginationUpComponent,
		PaginationDownComponent,
		PaginationOnBothSitesComponent,
		PaginationInfoComponent,
		WithoutSearchComponent,
		CustomNoDataMessageComponent,
		CustomRowsComponent,
		CustomCellsComponent,
		ExpandingRowsComponent,
		SelectableComponent,
		CustomRowsPerPageComponent,
		NotPaginatedComponent,
		StickyColumnsComponent,
		ResponsiveComponent,
		BatchActionsComponent,
		HoverableRowsComponent,
		AdvancedFilteringComponent,
		CustomLoadingComponent,
		ErrorComponent,
		CustomErrorComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		NbTableSorterModule
	]
})
export class ExamplesModule { }
