import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerPaginationComponent } from './components/server-pagination/server-pagination.component';
import { Routes, RouterModule } from '@angular/router';
import { ClientPaginationComponent } from './components/client-pagination/client-pagination.component';
import { RowsWithActionsComponent } from './components/rows-with-actions/rows-with-actions.component';

import { ExpandingRowsComponent } from './components/expanding-rows/expanding-rows.component';
import { NbTableSorterModule } from '../modules/nb-table-sorter';
import { CustomHeadersComponent } from './components/custom-headers/custom-headers.component';
import { SortableComponent } from './components/sortable/sortable.component';
import { PaginationUpComponent } from './components/pagination-up/pagination-up.component';
import { PaginationDownComponent } from './components/pagination-down/pagination-down.component';
import { PaginationOnBothSitesComponent } from './components/pagination-on-both-sites/pagination-on-both-sites.component';
import { PaginationInfoComponent } from './components/pagination-info/pagination-info.component';
import { WithoutSearchComponent } from './components/without-search/without-search.component';
import { CustomNoDataMessageComponent } from './components/custom-no-data-message/custom-no-data-message.component';
import { CustomRowsComponent } from './components/custom-rows/custom-rows.component';
import { CustomCellsComponent } from './components/custom-cells/custom-cells.component';
import { SelectableComponent } from './components/selectable/selectable.component';
import { CustomRowsPerPageComponent } from './components/custom-rows-per-page/custom-rows-per-page.component';
import { NotPaginatedComponent } from './components/not-paginated/not-paginated.component';

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
	{ path: 'not-paginated', component: NotPaginatedComponent }
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
		NotPaginatedComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NbTableSorterModule
	]
})
export class ExamplesModule { }
