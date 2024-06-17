import { Component, Input, forwardRef, inject } from '@angular/core';
import {
	ControlValueAccessor,
	FormArray,
	FormBuilder,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
	BooleanMatchModes,
	DateMatchModes,
	MatchMode,
	MenuFilterOperators,
	MenuFilterRule,
	MenuFilterValue,
	NumberMatchModes,
	StringMatchModes
} from '../../interfaces/column-filter-event';
import { PaginableTableHeader } from '../../interfaces/paginable-table-header';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
	selector: 'menu-filter',
	templateUrl: './menu-filter.component.html',
	styleUrls: ['./menu-filter.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MenuFilterComponent),
			multi: true
		}
	]
})
export class MenuFilterComponent implements ControlValueAccessor {
	private _fb = inject(FormBuilder);
	private _parent = inject(DropdownComponent);

	private _header!: PaginableTableHeader;
	@Input()
	get header(): PaginableTableHeader {
		return this._header;
	}
	set header(v: PaginableTableHeader) {
		this._header = v;
		this.setMatchMode();
		this.setDefaultValue();
	}

	form = this._fb.group({
		operator: [MenuFilterOperators.And],
		rules: this._fb.array([])
	});

	get rulesFA(): FormArray {
		return this.form.get('rules') as FormArray;
	}

	onChange = (value: MenuFilterValue) => {};
	onTouched = () => {};

	matchModes: Array<MatchMode> = [];

	defaultValue!: MenuFilterValue;

	writeValue(value: MenuFilterValue): void {
		this.rulesFA.clear();
		if (!value) {
			value = this.defaultValue;
		}
		value.rules.forEach((_) => this.add());
		this.form.patchValue(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	add(value?: MenuFilterRule) {
		const rulesFA = this.form.get('rules') as FormArray;
		const ruleFG = this._fb.group({
			value: [null],
			matchMode: [this.matchModes[0]]
		});
		if (value) {
			ruleFG.patchValue(value as any);
		}
		rulesFA.push(ruleFG);
	}

	clear() {
		const rulesFA = this.form.get('rules') as FormArray;
		rulesFA.clear();
		this.apply();
	}

	apply() {
		this.onChange(this.form.value as any);
		this._parent.closeDropdown();
	}

	setMatchMode() {
		switch (this.header.filter?.type) {
			case 'text':
				this.matchModes = Object.keys(StringMatchModes) as any;
				break;
			case 'number':
				this.matchModes = Object.keys(NumberMatchModes) as any;
				break;
			case 'date':
			case 'date-range':
				this.matchModes = Object.keys(DateMatchModes) as any;
				break;
			case 'boolean':
				this.matchModes = Object.keys(BooleanMatchModes) as any;
				break;
			default:
				console.warn('Unknown filter type');
				break;
		}
	}

	setDefaultValue() {
		this.defaultValue = {
			operator: MenuFilterOperators.And,
			rules: [
				{
					value: null,
					matchMode: this.matchModes[0]
				}
			]
		};
	}
}
