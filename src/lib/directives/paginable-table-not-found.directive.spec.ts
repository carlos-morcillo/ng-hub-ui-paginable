import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginableTableNotFoundDirective } from './paginable-table-not-found.directive';

/**
 * Test component for PaginableTableNotFoundDirective
 */
@Component({
	template: `
		<ng-template paginableTableNotFound>
			<div class="no-data-message">{{ noDataMessage }}</div>
		</ng-template>
	`,
	standalone: true,
	imports: [PaginableTableNotFoundDirective]
})
class TestNotFoundDirectiveComponent {
	readonly directive = viewChild.required(PaginableTableNotFoundDirective);

	noDataMessage = 'No data available';
}

/**
 * Test suite for PaginableTableNotFoundDirective
 * Tests custom no data/not found state template directive functionality
 */
describe('PaginableTableNotFoundDirective', () => {
	let component: TestNotFoundDirectiveComponent;
	let fixture: ComponentFixture<TestNotFoundDirectiveComponent>;
	let directive: PaginableTableNotFoundDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestNotFoundDirectiveComponent]
		});

		fixture = TestBed.createComponent(TestNotFoundDirectiveComponent);
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

	it('should work with noDataTpt selector', () => {
		@Component({
			template: `
				<ng-template noDataTpt>
					<div class="custom-no-data">No results found</div>
				</ng-template>
			`,
			standalone: true,
			imports: [PaginableTableNotFoundDirective]
		})
		class TestNoDataTptComponent {
			readonly directive = viewChild.required(PaginableTableNotFoundDirective);
		}

		const testFixture = TestBed.createComponent(TestNoDataTptComponent);
		testFixture.detectChanges();

		expect(testFixture.componentInstance.directive()).toBeTruthy();
	});

	it('should be accessible via ViewChild', () => {
		expect(component.directive()).toBe(directive);
	});

	it('should provide template context', () => {
		expect(directive.template).toBeDefined();
	});
});
