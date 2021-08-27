import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Component({
	selector: 'jw-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

	@Input() id: string;
	@Input() title: string;
	@Input() buttons: any[] = [];
	private element: any = this._el.nativeElement;

	constructor(
		private _modalSvc: ModalService,
		private _el: ElementRef
	) { }

	ngOnInit(): void {

		// ensure id attribute exists
		if (!this.id) {
			console.error('modal must have an id');
			return;
		}

		// move element to bottom of page (just before </body>) so it can be displayed above everything else
		document.body.appendChild(this.element);

		// close modal on background click
		this.element.addEventListener('click', element => {
			if (element.target.className === 'jw-modal') {
				this.close();
			}
		});

		// add self (this modal instance) to the modal service so it's accessible from controllers
		this._modalSvc.add(this);
	}

	// remove self from modal service when component is destroyed
	ngOnDestroy(): void {
		this._modalSvc.remove(this.id);
		this.element.remove();
	}

	// open modal
	open(): void {
		this.element.style.display = 'block';
		document.body.classList.add('jw-modal-open');
	}

	// close modal
	close(): void {
		this.element.style.display = 'none';
		document.body.classList.remove('jw-modal-open');
	}
}
