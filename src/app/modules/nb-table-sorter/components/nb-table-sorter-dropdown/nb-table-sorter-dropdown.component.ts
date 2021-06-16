import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NbTableSorterButton } from '../../interfaces/nb-table-sorter-button';
import { NbTableSorterDropdown } from '../../interfaces/nb-table-sorter-dropdown';

@Component({
	selector: 'nb-table-sorter-dropdown',
	templateUrl: './nb-table-sorter-dropdown.component.html',
	styleUrls: ['./nb-table-sorter-dropdown.component.scss']
})
export class NbTableSorterDropdownComponent {

	@Input() options: NbTableSorterDropdown;
	@Input() item: any;
	@Input() position: 'left' | 'right' = 'left';

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
