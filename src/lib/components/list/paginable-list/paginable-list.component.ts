import { CommonModule } from '@angular/common';
import {
	Component,
	ContentChild,
	Input,
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
import { PaginableListItemDirective } from '../../../directives/paginable-list-item.directive';
import { PaginableTableNotFoundDirective } from '../../../directives/paginable-table-not-found.directive';
import { ListClickEvent } from '../../../interfaces/item-click-event';
import { PaginableTableDropdown } from '../../../interfaces/paginable-table-dropdown';
import { PaginableTableOptions } from '../../../interfaces/paginable-table-options';
import { RowButton } from '../../../interfaces/row-button';
import { UcfirstPipe } from '../../../pipes/ucfirst.pipe';
import { getValue } from '../../../utils';
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
	selector: 'hub-list, hub-ui-list, hub-paginable-list',
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

	private _options: PaginableTableOptions = {
		cursor: 'default',
		hoverableRows: false,
		striped: null,
		variant: null,
		searchable: false,
		collapsed: true
	};
	get options(): PaginableTableOptions {
		return this._options;
	}
	@Input()
	set options(v: PaginableTableOptions) {
		this._options = v;
		this.buildForm(this.form, this._items);
	}

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

	@Input() clickFn: (event: ListClickEvent<T>) => void | Promise<void>;

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
	private _batchActions: Array<PaginableTableDropdown | RowButton> = [];
	@Input()
	get batchActions(): Array<PaginableTableDropdown | RowButton> {
		return this._batchActions;
	}
	set batchActions(v: Array<PaginableTableDropdown | RowButton>) {
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
		form.clear();
		for (const index in items) {
			if (Object.prototype.hasOwnProperty.call(items, index)) {
				const item = items[index];

				const group = this.#fb.group({
					selected: [true],
					collapsed: [this.options.collapsed],
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
	 * Emits a structured click event for the clicked list item, including metadata and state.
	 *
	 * This method is typically called when an item in the list is clicked. It extracts contextual
	 * information such as depth, index, selection state, and expansion state, then passes it to
	 * the user-defined `clickFn` callback.
	 *
	 * If a `bindLabel` is configured, the emitted `value` will be derived from that property;
	 * otherwise, the full item will be passed as `value`.
	 *
	 * @param item - The list item object, including `selected` and `collapsed` state.
	 * @param depth - The nesting depth of the item within a tree structure (0 = root level).
	 * @param index - The position of the item in the current visible list or page.
	 * @param event - The native `MouseEvent` that triggered the click.
	 *
	 * @remarks
	 * If the `clickFn` callback is not defined, the method exits early and no event is emitted.
	 */
	onItemClick(
		{ collapsed, selected, ...item },
		depth: number,
		index: number,
		event: MouseEvent
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
			item: item as T,
			mouseEvent: event
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
