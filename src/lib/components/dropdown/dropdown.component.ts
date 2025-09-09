import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  input,
  output
} from '@angular/core';
import { generateUniqueId } from '../../utils';

@Component({
	selector: 'hub-dropdown, hub-ui-dropdown',
	standalone: true,
	imports: [],
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dropdown'
	}
})
export class DropdownComponent {
	private _cdr = inject(ChangeDetectorRef);

	@HostBinding()
readonly id = input(generateUniqueId(16));

	readonly open = output<{
    id: string;
}>();

	readonly close = output<{
    id: string;
}>();

	isOpened: boolean = false;

	toggle() {
		this.isOpened = !this.isOpened;
		this._cdr.markForCheck();
		if (this.isOpened) {
			this.open.emit({ id: this.id() });
		}
	}

	closeDropdown() {
		this.isOpened = false;
		this._cdr.markForCheck();
	}

	openDropdown() {
		this.isOpened = true;
		this._cdr.markForCheck();
	}
}
