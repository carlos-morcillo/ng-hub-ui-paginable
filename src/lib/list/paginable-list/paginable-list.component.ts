import {
	Component,
	ContentChild,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	inject
} from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import { PaginableListItemDirective } from '../../directives/paginable-list-item.directive';

export enum SelectionTypes {
	Single = 'single',
	Multiple = 'multiple'
}

export interface TreeListItem {
	label: string;
	children?: Array<TreeListItem>;
	[key: string]: any;
}

@Component({
	selector: 'ng80-paginable-list',
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
	]
})
export class PaginableListComponent {
	private _fb = inject(FormBuilder);

	@Input() bindLabel?: string;
	@Input() selectable: SelectionTypes | null = null;

	private _tree!: TreeListItem[];
	@Input()
	get tree(): TreeListItem[] {
		return this._tree;
	}
	set tree(v: TreeListItem[]) {
		this._tree = v ?? [];
		this.form.clear();
		this.buildForm(this.form, this._tree);
	}

	@Output() itemClick = new EventEmitter<any>();

	form: FormArray = this._fb.array([]);

	value: Array<TreeListItem & { collapsed: boolean }> = [];

	@ContentChild(PaginableListItemDirective, { read: TemplateRef })
	itemTpt?: TemplateRef<any>;

	isDisabled: boolean = false;

	onChange: any = () => {};
	onTouch: any = () => {};

	writeValue(value: Array<TreeListItem> = []): void {
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

	buildForm(form: FormArray, items: Array<TreeListItem>) {
		for (const item of items) {
			const { children, ...newItem } = item;

			const group = this._fb.group({
				id: [null],
				label: [''],
				// data: [null],
				children: this._fb.array([]),
				collapsed: [true],
				selected: [true]
			});

			group.patchValue(newItem);

			if (children?.length) {
				this.buildForm(group.get('children') as FormArray, children);
				newItem['children'] = this.buildValue(children);
			}
			form.push(group);
		}
	}

	buildValue(
		items: Array<TreeListItem>
	): Array<TreeListItem & { collapsed: boolean }> {
		const value: Array<TreeListItem & { collapsed: boolean }> = [];
		for (const item of items) {
			const { children, ...newItem } = item;
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

	onItemClick(value: TreeListItem, { collapsed }) {
		this.itemClick.next({ data: value, collapsed });
	}
}
