import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubListDragHandleDirective } from './list-drag-handle.directive';

/**
 * Test host for HubListDragHandleDirective.
 */
@Component({
	template: `<span hubListDragHandle #el>::</span>`,
	imports: [HubListDragHandleDirective]
})
class TestHandleHostComponent {
	readonly directive = viewChild.required(HubListDragHandleDirective);
	readonly el = viewChild.required('el', { read: ElementRef });
}

describe('HubListDragHandleDirective', () => {
	let fixture: ComponentFixture<TestHandleHostComponent>;
	let component: TestHandleHostComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHandleHostComponent, HubListDragHandleDirective]
		});
		fixture = TestBed.createComponent(TestHandleHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(component.directive()).toBeTruthy();
	});

	it('should tag its host with the drag-handle marker class', () => {
		const host = component.el().nativeElement as HTMLElement;
		expect(host.classList.contains('hub-list__drag-handle')).toBe(true);
	});

	it('should not opt the host out of native dragging', () => {
		const host = component.el().nativeElement as HTMLElement;
		// A `draggable="false"` handle would block the native drag from starting on it.
		expect(host.getAttribute('draggable')).not.toBe('false');
	});
});
