import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NbTableSorterButton } from '../../interfaces/nb-table-sorter-button';
import { NbTableSorterDropdown } from '../../interfaces/nb-table-sorter-dropdown';

@Component({
	selector: 'nb-table-sorter-dropdown',
	templateUrl: './nb-table-sorter-dropdown.component.html',
	styleUrls: ['./nb-table-sorter-dropdown.component.scss']
})
export class NbTableSorterDropdownComponent implements OnInit {

	@Input() dropdownToggle: NbTableSorterDropdown;
	@Input() item: any;

	shown: boolean = false;

	constructor(
		private _elementRef: ElementRef,
	) { }

	ngOnInit(): void {
	}


	@HostListener('document:click', ['$event'])
	clickOut(event) {
		if (!this._elementRef.nativeElement.contains(event.target) && this.shown) {
			this.close();
		}
	}

	handle(button: NbTableSorterButton) {
		button.handler(this.item);
		this.close();
	}

	close() {
		this.shown = false;
	}

}
