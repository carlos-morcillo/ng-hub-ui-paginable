import { Component, forwardRef, Input } from '@angular/core';
import {
	ControlValueAccessor,
	FormsModule,
	NG_VALUE_ACCESSOR
} from '@angular/forms';
import { UcfirstPipe } from '../../pipes/ucfirst.pipe';
import { TranslatePipe } from '../../translate.pipe';

@Component({
	selector: 'hub-table-range-input, paginable-table-range-input',
	templateUrl: './paginable-table-range-input.component.html',
	styleUrls: ['./paginable-table-range-input.component.scss'],
	standalone: true,
	imports: [FormsModule, TranslatePipe, UcfirstPipe],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PaginableTableRangeInputComponent),
			multi: true
		}
	]
})
export class PaginableTableRangeInputComponent implements ControlValueAccessor {
	@Input() disabled = false;
	@Input() type: 'number' | 'date' = 'number';

	onChange = (value: [string | number, string | number]) => {};

	onTouched = () => {};

	value: [string | number | null, string | number | null] = [null, null];

	writeValue(value: [string | number, string | number]): void {
		if (Array.isArray(value) && value.length === 2) {
			this.value = value;
		} else {
			this.value = [null, null];
		}
	}

	registerOnChange(
		fn: (value: [string | number, string | number]) => void
	): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
