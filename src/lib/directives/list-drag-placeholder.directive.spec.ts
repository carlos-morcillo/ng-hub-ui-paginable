import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubListDragPlaceholderDirective } from './list-drag-placeholder.directive';

/**
 * Test host for HubListDragPlaceholderDirective.
 */
@Component({
	template: `
		<ng-template hubListDragPlaceholder let-item="item">
			<div class="placeholder">{{ item?.name }}</div>
		</ng-template>
	`,
	imports: [HubListDragPlaceholderDirective]
})
class TestPlaceholderHostComponent {
	readonly directive = viewChild.required(HubListDragPlaceholderDirective);
}

describe('HubListDragPlaceholderDirective', () => {
	let fixture: ComponentFixture<TestPlaceholderHostComponent>;
	let directive: HubListDragPlaceholderDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestPlaceholderHostComponent, HubListDragPlaceholderDirective]
		});
		fixture = TestBed.createComponent(TestPlaceholderHostComponent);
		directive = fixture.componentInstance.directive();
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should expose a template reference', () => {
		expect(directive.template).toBeTruthy();
		expect(directive.template instanceof TemplateRef).toBe(true);
	});
});
