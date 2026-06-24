import { FormArray, FormControl } from '@angular/forms';
import { moveControlInFormArray, transferControlBetweenFormArrays } from './list-drag.utils';

describe('list-drag.utils (FormArray helpers)', () => {
	describe('moveControlInFormArray', () => {
		it('should preserve control instances while reordering', () => {
			const a = new FormControl('A');
			const b = new FormControl('B');
			const c = new FormControl('C');
			const form = new FormArray([a, b, c]);
			moveControlInFormArray(form, 0, 2);
			expect(form.at(0)).toBe(b);
			expect(form.at(1)).toBe(c);
			expect(form.at(2)).toBe(a);
		});

		it('should be a no-op when indexes are equal', () => {
			const a = new FormControl('A');
			const b = new FormControl('B');
			const form = new FormArray([a, b]);
			moveControlInFormArray(form, 1, 1);
			expect(form.at(0)).toBe(a);
			expect(form.at(1)).toBe(b);
		});
	});

	describe('transferControlBetweenFormArrays', () => {
		it('should move a control between form arrays preserving the instance', () => {
			const a = new FormControl('A');
			const b = new FormControl('B');
			const source = new FormArray([a, b]);
			const target = new FormArray<FormControl>([]);
			transferControlBetweenFormArrays(source, target, 0, 0);
			expect(source.length).toBe(1);
			expect(source.at(0)).toBe(b);
			expect(target.at(0)).toBe(a);
		});
	});
});
