import {
	Component,
	ContentChild,
	Input,
	OnInit,
	TemplateRef
} from '@angular/core';
import { PaginableTableComponent } from '../../components/paginable-table/paginable-table.component';
import { PaginableListItemDirective } from '../../directives/paginable-list-item.directive';

@Component({
	selector: 'ng80-paginable-list',
	templateUrl: './paginable-list.component.html',
	styleUrls: ['./paginable-list.component.scss'],
	host: {
		class: 'd-flex flex-column gap-4'
	}
})
export class PaginableListComponent
	extends PaginableTableComponent
	implements OnInit
{
	@Input() bindLabel?: string;

	@ContentChild(PaginableListItemDirective, { read: TemplateRef })
	itemTpt?: TemplateRef<any>;

	override ngOnInit(): void {
		if (!this.bindLabel) {
			throw new Error('bindLabel not provided');
		}
		super.ngOnInit();
		this._initializeFilterForm();
	}
}
