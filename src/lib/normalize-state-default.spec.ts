import { Component } from '@angular/core';
import { normalizeStateDefault } from './utils';

@Component({ selector: 'hub-test-state', standalone: true, template: '' })
class TestStateComponent {}

/**
 * Test suite for normalizeStateDefault: the pure helper that reduces every
 * accepted default-state shape to a single descriptor.
 */
describe('normalizeStateDefault', () => {
	it('returns null for null/undefined', () => {
		expect(normalizeStateDefault(null)).toBeNull();
		expect(normalizeStateDefault(undefined)).toBeNull();
	});

	it('treats a bare component class as an eager component', () => {
		const result = normalizeStateDefault(TestStateComponent);
		expect(result).toEqual({ component: TestStateComponent });
	});

	it('treats a plain function as a lazy loader', () => {
		const loader = () => Promise.resolve(TestStateComponent);
		const result = normalizeStateDefault(loader);
		expect(result).toEqual({ loader });
	});

	it('keeps the input factory from a full descriptor with an eager component', () => {
		const inputs = () => ({ message: 'hi' });
		const result = normalizeStateDefault({ component: TestStateComponent, inputs });
		expect(result).toEqual({ component: TestStateComponent, inputs });
	});

	it('keeps the input factory from a descriptor with a lazy component', () => {
		const loader = () => Promise.resolve(TestStateComponent);
		const inputs = () => ({ message: 'hi' });
		const result = normalizeStateDefault({ component: loader, inputs });
		expect(result).toEqual({ loader, inputs });
	});
});
