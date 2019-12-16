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
import { PaginatePipe } from './paginate.pipe';
import { TableSorterComponent } from './table-sorter.component';
import { UcfirstPipe } from './ucfirst.pipe';
import { ValueOrDatePipe } from './value-or-date.pipe';
import { NbTableSorterCellDirective } from './nb-table-sorter-cell.directive';

@NgModule({
	declarations: [
		TableSorterComponent,
		NbTableSorterHeaderDirective,
		NbTableSorterRowDirective,
		NbTableSorterCellDirective,
		GetPipe,
		PaginatePipe,
		NbTableSorterNotFoundDirective,
		ValueOrDatePipe,
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
		PaginatePipe,
		NbTableSorterNotFoundDirective,
		ValueOrDatePipe,
		IsObjectPipe,
		UcfirstPipe,
		IsStringPipe,
		NbTableSorterPaginatorComponent
	]


})
export class NbTableSorterModule { }
