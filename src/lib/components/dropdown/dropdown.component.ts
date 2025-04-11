import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	inject
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

	@HostBinding() @Input() id = generateUniqueId(16);

	@Output() open = new EventEmitter<{
		id: string;
	}>();

	@Output() close = new EventEmitter<{
		id: string;
	}>();

	isOpened: boolean = false;

	toggle() {
		this.isOpened = !this.isOpened;
		this._cdr.markForCheck();
		if (this.isOpened) {
			this.open.next({ id: this.id });
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
