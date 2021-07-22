import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NbTableSorterButton } from '../../interfaces/nb-table-sorter-button';
import { NbTableSorterDropdown } from '../../interfaces/nb-table-sorter-dropdown';

@Component({
	selector: 'nb-table-sorter-dropdown',
	templateUrl: './nb-table-sorter-dropdown.component.html',
	styleUrls: ['./nb-table-sorter-dropdown.component.scss']
})
export class NbTableSorterDropdownComponent {

	@Input() item: any;

	private _options: NbTableSorterDropdown = { buttons: [] };
	@Input()
	get options(): NbTableSorterDropdown {
		return this._options;
	}
	set options(v: NbTableSorterDropdown) {
		this._options = { position: 'right', fill: 'clear', color: 'muted', ...v };
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

	handle(button: NbTableSorterButton) {
		button.handler(...[this.item]);
		this.close();
	}

	close() {
		this.shown = false;
	}

}
