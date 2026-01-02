import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginableTableExpandingRowDirective } from './paginable-table-expanding-row.directive';

/**
 * Test component for PaginableTableExpandingRowDirective
 */
@Component({
	template: `
		<ng-template paginableTableExpandingRow let-row>
			<div class="expanded-content">{{ row.details }}</div>
		</ng-template>
	`,
	standalone: true,
	imports: [PaginableTableExpandingRowDirective]
})
class TestExpandingRowDirectiveComponent {
	@ViewChild(PaginableTableExpandingRowDirective, { static: true })
	directive!: PaginableTableExpandingRowDirective;
}

/**
 * Test suite for PaginableTableExpandingRowDirective
 * Tests custom expanding/collapsible row template directive functionality
 */
describe('PaginableTableExpandingRowDirective', () => {
	let component: TestExpandingRowDirectiveComponent;
	let fixture: ComponentFixture<TestExpandingRowDirectiveComponent>;
	let directive: PaginableTableExpandingRowDirective;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestExpandingRowDirectiveComponent]
		});

		fixture = TestBed.createComponent(TestExpandingRowDirectiveComponent);
		component = fixture.componentInstance;
		directive = component.directive;
		fixture.detectChanges();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should have a templateRef reference', () => {
		expect(directive.templateRef).toBeTruthy();
		expect(directive.templateRef instanceof TemplateRef).toBe(true);
	});

	it('should work with expandingRowTpt selector', () => {
		@Component({
			template: `
				<ng-template expandingRowTpt let-row>
					<div class="custom-expanded">{{ row.info }}</div>
				</ng-template>
			`,
			standalone: true,
			imports: [PaginableTableExpandingRowDirective]
		})
		class TestExpandingRowTptComponent {
			@ViewChild(PaginableTableExpandingRowDirective, { static: true })
			directive!: PaginableTableExpandingRowDirective;
		}

		const testFixture = TestBed.createComponent(TestExpandingRowTptComponent);
		testFixture.detectChanges();

		expect(testFixture.componentInstance.directive).toBeTruthy();
	});

	it('should be accessible via ViewChild', () => {
		expect(component.directive).toBe(directive);
	});

	it('should provide template context', () => {
		expect(directive.templateRef).toBeDefined();
	});
});
