import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerPaginationComponent } from './components/server-pagination/server-pagination.component';
import { Routes, RouterModule } from '@angular/router';
import { NbTableSorterModule } from '../modules/nb-table-sorter/nb-table-sorter.module';
import { HighlightModule } from 'ngx-highlightjs';
import { ClientPaginationComponent } from './components/client-pagination/client-pagination.component';
import { RowsWithActionsComponent } from './components/rows-with-actions/rows-with-actions.component';
import { CustomHeadersComponent } from '../modules/nb-table-sorter/components/custom-headers/custom-headers.component';
import { SortableComponent } from '../modules/nb-table-sorter/components/sortable/sortable.component';
import { PaginationUpComponent } from '../modules/nb-table-sorter/components/pagination-up/pagination-up.component';
import { PaginationDownComponent } from '../modules/nb-table-sorter/components/pagination-down/pagination-down.component';
import { PaginationOnBothSitesComponent } from '../modules/nb-table-sorter/components/pagination-on-both-sites/pagination-on-both-sites.component';
import { PaginationInfoComponent } from '../modules/nb-table-sorter/components/pagination-info/pagination-info.component';
import { WithoutSearchComponent } from '../modules/nb-table-sorter/components/without-search/without-search.component';
import { CustomNoDataMessageComponent } from '../modules/nb-table-sorter/components/custom-no-data-message/custom-no-data-message.component';
import { CustomRowsComponent } from '../modules/nb-table-sorter/components/custom-rows/custom-rows.component';
import { CustomCellsComponent } from '../modules/nb-table-sorter/components/custom-cells/custom-cells.component';
import { AvatarModule } from 'ngx-avatar';

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
	{ path: 'custom-cells', component: CustomCellsComponent }
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
		CustomCellsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NbTableSorterModule,
		HighlightModule,
		AvatarModule
	]
})
export class ExamplesModule { }
