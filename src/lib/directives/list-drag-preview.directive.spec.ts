import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubListDragPreviewDirective } from './list-drag-preview.directive';

/**
 * Test host for HubListDragPreviewDirective.
 */
@Component({
	template: `
		<ng-template hubListDragPreview let-item="item">
			<div class="preview">{{ item?.name }}</div>
		</ng-template>
	`,
	imports: [HubListDragPreviewDirective]
})
class TestPreviewHostComponent {
	readonly directive = viewChild.required(HubListDragPreviewDirective);
}

describe('HubListDragPreviewDirective', () => {
	let fixture: ComponentFixture<TestPreviewHostComponent>;
	let directive: HubListDragPreviewDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestPreviewHostComponent, HubListDragPreviewDirective]
		});
		fixture = TestBed.createComponent(TestPreviewHostComponent);
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
