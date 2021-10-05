import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { PaginableTableButton } from '../../interfaces/paginable-table-button';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';

@Component({
	selector: 'paginable-table-dropdown',
	templateUrl: './paginable-table-dropdown.component.html',
	styleUrls: ['./paginable-table-dropdown.component.scss']
})
export class NbTableSorterDropdownComponent {

	@Input() item: any;

	private _options: PaginableTableDropdown = { buttons: [] };
	@Input()
	get options(): PaginableTableDropdown {
		return this._options;
	}
	set options(v: PaginableTableDropdown) {
		this._options = { position: 'end', fill: 'clear', color: 'muted', ...v };
		if (this._options.fill === 'clear') {
			this.buttonClass = 'btn btn-link text-' + (this._options.color ?? 'muted');
		} else {
			this.buttonClass = 'btn ' + ['btn', this._options.fill, this._options.color].filter(o => o).join('-');
		}
	}

	@Input() disabled: boolean = false;

	buttonClass: string;
	shown: boolean = false;

	constructor(
		private _elementRef: ElementRef,
	) { }


	@HostListener('document:click', ['$event'])
	clickOut(event) {
		if (!this._elementRef.nativeElement.contains(event.target) && this.shown) {
			this.close();
		}
	}

	handle(button: PaginableTableButton) {
		button.handler(...[this.item]);
		this.close();
	}

	close() {
		this.shown = false;
	}

}
