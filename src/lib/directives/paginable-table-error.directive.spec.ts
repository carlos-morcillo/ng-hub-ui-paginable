import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginableTableErrorDirective } from './paginable-table-error.directive';

/**
 * Test component for PaginableTableErrorDirective
 */
@Component({
	template: `
		<ng-template paginableTableError>
			<div class="error-message">{{ errorMessage }}</div>
		</ng-template>
	`,
	standalone: true,
	imports: [PaginableTableErrorDirective]
})
class TestErrorDirectiveComponent {
	@ViewChild(PaginableTableErrorDirective, { static: true })
	directive!: PaginableTableErrorDirective;

	errorMessage = 'An error occurred';
}

/**
 * Test suite for PaginableTableErrorDirective
 * Tests custom error state template directive functionality
 */
describe('PaginableTableErrorDirective', () => {
	let component: TestErrorDirectiveComponent;
	let fixture: ComponentFixture<TestErrorDirectiveComponent>;
	let directive: PaginableTableErrorDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestErrorDirectiveComponent]
		});

		fixture = TestBed.createComponent(TestErrorDirectiveComponent);
		component = fixture.componentInstance;
		directive = component.directive;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should have a template reference', () => {
		expect(directive.template).toBeTruthy();
		expect(directive.template instanceof TemplateRef).toBe(true);
	});

	it('should work with errorTpt selector', () => {
		@Component({
			template: `
				<ng-template errorTpt>
					<div class="custom-error">Error!</div>
				</ng-template>
			`,
			standalone: true,
			imports: [PaginableTableErrorDirective]
		})
		class TestErrorTptComponent {
			@ViewChild(PaginableTableErrorDirective, { static: true })
			directive!: PaginableTableErrorDirective;
		}

		const testFixture = TestBed.createComponent(TestErrorTptComponent);
		testFixture.detectChanges();

		expect(testFixture.componentInstance.directive).toBeTruthy();
	});

	it('should be accessible via ViewChild', () => {
		expect(component.directive).toBe(directive);
	});

	it('should provide template context', () => {
		expect(directive.template).toBeDefined();
	});
});
