import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerPaginationComponent } from './components/server-pagination/server-pagination.component';
import { Routes, RouterModule } from '@angular/router';
import { NbTableSorterModule } from '../modules/nb-table-sorter/nb-table-sorter.module';
import { HighlightModule } from 'ngx-highlightjs';
import { ClientPaginationComponent } from './components/client-pagination/client-pagination.component';
import { RowsWithActionsComponent } from './components/rows-with-actions/rows-with-actions.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'server-pagination' },
	{ path: 'server-pagination', component: ServerPaginationComponent },
	{ path: 'client-pagination', component: ClientPaginationComponent },
	{ path: 'rows-with-actions', component: RowsWithActionsComponent }
];

@NgModule({
	declarations: [
		ServerPaginationComponent,
		ClientPaginationComponent,
		RowsWithActionsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NbTableSorterModule,
		HighlightModule
	]
})
export class ExamplesModule { }
