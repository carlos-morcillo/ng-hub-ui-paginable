import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UnwrapAsyncPipe } from './unwrap-async.pipe';

@Component({
	template: `
		<div>{{ observableValue | unwrapAsync }}</div>
		<div>{{ directValue | unwrapAsync }}</div>
	`
})
class TestComponent {
	observableValue = of('Observable value');
	directValue = 'Direct value';
}

describe('UnwrapAsyncPipe', () => {
	let pipe: UnwrapAsyncPipe;
	let component: TestComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, UnwrapAsyncPipe]
		});

		pipe = new UnwrapAsyncPipe();
		component = TestBed.createComponent(TestComponent).componentInstance;
	});

	it('should create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should unwrap the value of an observable', () => {
		const transformedValue = pipe.transform(component.observableValue);
		expect(transformedValue).toBe('Observable value');
	});

	it('should return the direct value if not an observable', () => {
		const transformedValue = pipe.transform(component.directValue);
		expect(transformedValue).toBe('Direct value');
	});

	// it('should unsubscribe from the previous subscription when transforming a new observable', () => {
	// 	const unsubscribeSpy = spyOn(pipe, 'unsubscribe');

	// 	pipe.transform(component.observableValue);
	// 	expect(unsubscribeSpy).toHaveBeenCalledTimes(1);

	// 	pipe.transform(of('New observable value'));
	// 	expect(unsubscribeSpy).toHaveBeenCalledTimes(2);
	// });

	it('should mark the view for check when receiving a new value from the observable', () => {
		const markForCheckSpy = spyOn(pipe['#cdr'], 'markForCheck');

		pipe.transform(component.observableValue);
		expect(markForCheckSpy).toHaveBeenCalledTimes(1);
	});

	// it('should clean up the subscription when the pipe is destroyed', () => {
	// 	const unsubscribeSpy = spyOn(pipe, 'unsubscribe');

	// 	pipe.transform(component.observableValue);
	// 	pipe.ngOnDestroy();
	// 	expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
	// });
});
