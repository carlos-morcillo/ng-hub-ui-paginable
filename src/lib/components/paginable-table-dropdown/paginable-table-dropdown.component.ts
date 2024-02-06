import {
	Component,
	ElementRef,
	HostListener,
	Input,
	inject
} from '@angular/core';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';

@Component({
	selector: 'paginable-table-dropdown',
	templateUrl: './paginable-table-dropdown.component.html',
	styleUrls: ['./paginable-table-dropdown.component.scss']
})
export class PaginableTableDropdownComponent<T = any> {
	private _elementRef = inject(ElementRef);

	@Input() item: T | undefined;

	private _options: PaginableTableDropdown = { buttons: [] };
	@Input()
	get options(): PaginableTableDropdown {
		return this._options;
	}
	set options(v: PaginableTableDropdown) {
		this._options = {
			position: 'end',
			fill: 'clear',
			color: 'muted',
			...v
		};
		if (this._options.fill === 'clear') {
			this.buttonClass =
				'btn btn-link text-' + (this._options.color ?? 'muted');
		} else {
			this.buttonClass =
				'btn ' +
				['btn', this._options.fill, this._options.color]
					.filter((o) => o)
					.join('-');
		}
	}

	@Input() disabled: boolean = false;

	buttonClass: string | null = null;
	shown: boolean = false;

	@HostListener('document:click', ['$event'])
	clickOut(event) {
		if (
			!this._elementRef.nativeElement.contains(event.target) &&
			this.shown
		) {
			this.close();
		}
	}

	close() {
		this.shown = false;
	}
}
