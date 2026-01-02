import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginableListItemDirective } from './paginable-list-item.directive';

/**
 * Test component for PaginableListItemDirective
 */
@Component({
	template: `
		<ng-template listItemTpt let-item>
			<div class="list-item">{{ item.name }}</div>
		</ng-template>
	`,
	imports: [PaginableListItemDirective]
})
class TestListItemDirectiveComponent {
	readonly directive = viewChild.required(PaginableListItemDirective);
}

/**
 * Test suite for PaginableListItemDirective
 * Tests custom list item template directive functionality
 */
describe('PaginableListItemDirective', () => {
	let component: TestListItemDirectiveComponent;
	let fixture: ComponentFixture<TestListItemDirectiveComponent>;
	let directive: PaginableListItemDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestListItemDirectiveComponent, PaginableListItemDirective]
		});

		fixture = TestBed.createComponent(TestListItemDirectiveComponent);
		component = fixture.componentInstance;
		directive = component.directive();
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should have a template reference', () => {
		expect(directive.template).toBeTruthy();
		expect(directive.template instanceof TemplateRef).toBe(true);
	});

	it('should be accessible via ViewChild', () => {
		expect(component.directive()).toBe(directive);
	});

	it('should provide template context', () => {
		expect(directive.template).toBeDefined();
	});
});
