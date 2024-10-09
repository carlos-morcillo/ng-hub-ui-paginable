import { CommonModule } from '@angular/common';
import {
	Component,
	ContentChild,
	Input,
	Output,
	TemplateRef,
	inject
} from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule
} from '@angular/forms';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PaginableListItemDirective } from '../../directives/paginable-list-item.directive';
import { PaginableTableNotFoundDirective } from '../../directives/paginable-table-not-found.directive';
import { ItemClickEvent } from '../../interfaces/item-click-event';
import { PaginableTableButton } from '../../interfaces/paginable-table-button';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';
import { PaginableTableOptions } from '../../interfaces/paginable-table-options';
import { UcfirstPipe } from '../../pipes/ucfirst.pipe';
import { TranslatePipe } from '../../translate.pipe';
import { getValue } from '../../utils';

@Component({
	selector: 'hub-ui-paginable-list',
	templateUrl: './paginable-list.component.html',
	styleUrls: ['./paginable-list.component.scss'],
	host: {
		class: 'd-flex flex-column gap-4'
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PaginableListComponent,
			multi: true
		}
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		PaginatorComponent,
		PaginableTableNotFoundDirective,
		TranslatePipe,
		UcfirstPipe
	],
	standalone: true
})
export class PaginableListComponent<T = any> {
	#fb = inject(FormBuilder);

	@Input() bindValue?: string;
	@Input() bindLabel: string = 'label';
	@Input() bindChildren: string = 'children';

	@Input() selectable!: string | null;

	@Input() options: PaginableTableOptions = {
		cursor: 'default',
		hoverableRows: false,
		striped: null,
		variant: null,
		searchable: false
	};

	private _items!: Array<T>;
	@Input()
	get items(): Array<T> {
		return this._items;
	}
	set items(v: Array<T>) {
		this._items = v ?? [];
		this.form.clear();
		this.buildForm(this.form, this._items);
	}

	@Input() clickFn: (event: ItemClickEvent<T>) => void | Promise<void>;

	form: FormArray = this.#fb.array([]);

	value: Array<T & { collapsed: boolean }> = [];

	// NOTE: Templates

	@ContentChild(PaginableListItemDirective, { read: TemplateRef })
	itemTpt?: TemplateRef<any>;
	@ContentChild(PaginableTableNotFoundDirective, { read: TemplateRef })
	noDataTpt?: TemplateRef<any>;

	// NOTE: Otros
	isDisabled: boolean = false;

	onChange: any = () => {};
	onTouch: any = () => {};

	// NOTE: Filters

	searchFG = this.#fb.control({});

	// NOTE: Batch actions

	/**
	 * Collection of actions for items
	 *
	 * @type {PaginableTableRowAction[]}
	 * @memberof PaginableTableComponent
	 */
	private _batchActions: Array<
		PaginableTableDropdown | PaginableTableButton
	> = [];
	@Input()
	get batchActions(): Array<PaginableTableDropdown | PaginableTableButton> {
		return this._batchActions;
	}
	set batchActions(v: Array<PaginableTableDropdown | PaginableTableButton>) {
		this._batchActions = v.map((b) => {
			if ((b as PaginableTableDropdown).buttons) {
				b = { fill: null, position: 'start', color: 'light', ...b };
			}
			return b;
		});
	}

	// NOTE: Control access value

	writeValue(value: Array<T> = []): void {
		// this.value = this.buildValue(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	/**
	 * Handles the action to be executed in a batch
	 *
	 * @param {Event} event
	 * @memberof PaginableTableComponent
	 */
	handleBatchAction(event: any) {
		event.handler(this.value);
	}

	buildForm(form: FormArray, items: Array<any>) {
		for (const index in items) {
			if (Object.prototype.hasOwnProperty.call(items, index)) {
				const item = items[index];

				const group = this.#fb.group({
					selected: [true],
					collapsed: [true],
					data: [item],
					children: this.#fb.array([])
				});

				group.patchValue(item);

				if (item[this.bindChildren]?.length) {
					this.buildForm(
						group.get('children') as FormArray,
						item[this.bindChildren]
					);
					// newItem['children'] = this.buildValue(children);
				}
				form.push(group);
			}
		}
	}

	buildValue(items: Array<T>): Array<T & { collapsed: boolean }> {
		const value: Array<T & { collapsed: boolean }> = [];
		for (const item of items) {
			const { children, ...newItem } = item as any;
			if (children?.length) {
				newItem['children'] = this.buildValue(children);
			}
			value.push({
				...newItem,
				collapsed: true
			});
		}
		return value;
	}

	toggleCollapsed(control: FormControl) {
		control.patchValue(!control.value);
	}

	/**
	 * Handles click events by extracting specific properties and passing them to a callback function.
	 *
	 * @param  - The `onItemClick` function takes in the following parameters: collapsed, selected and item.
	 * @param {number} depth - The `depth` parameter in the `onItemClick` function represents the depth level of the item being
	 * clicked. It is a number that indicates how deep the item is nested within a hierarchical structure.
	 * @param {number} index - The `index` parameter in the `onItemClick` function represents the position of the item that was clicked
	 * within a list or array. It is a number that indicates the index of the clicked item.
	 *
	 * @returns If the `clickFn` property is not defined in the current context, the `onItemClick` function will return without
	 * executing any further code.
	 */
	onItemClick(
		{ collapsed, selected, ...item },
		depth: number,
		index: number
	) {
		if (!this.clickFn) {
			return;
		}

		this.clickFn({
			depth,
			index,
			selected,
			collapsed,
			value: this.bindLabel ? getValue(item, this.bindLabel) : item,
			item: item as T
		});
	}

	onPageClicked(page: number) {
		// if (!this.data) {
		// 	return;
		// }
		// this.data.currentPage = page;
		// this.triggerTheParamChanges();
	}

	filter() {
		// if (!this.data) {
		// 	return;
		// }
		// this.data.currentPage = 1;
		// this.filterChange.emit({
		// 	searchText: this.searchFG?.value ?? null,
		// 	specificSearch: this.specificSearchFG?.value ?? null
		// });
	}
}
