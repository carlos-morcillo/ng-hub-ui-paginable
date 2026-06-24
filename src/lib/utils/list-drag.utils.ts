import { FormArray } from '@angular/forms';
import { clamp, DragContainerRef } from 'ng-hub-ui-utils';

// Re-export the shared native drag-and-drop core so existing imports keep working.
export {
	clamp,
	computeTargetIndex,
	containsNode,
	copyArrayItem,
	moveItemInArray,
	resolveDropPosition,
	toAbsoluteIndex,
	transferArrayItem
} from 'ng-hub-ui-utils';
export type { DragAxis, DragContainerRef, DragPointerMode, DragTarget, DropPosition, DropRect } from 'ng-hub-ui-utils';

/**
 * List-specific drag container reference: the shared reference plus the `FormArray` that
 * mirrors the data array, so reordering preserves per-item form state (selection/collapse).
 *
 * @template T Item type held by the collection.
 */
export interface ListDragContainerRef<T = any> extends DragContainerRef<T> {
	/** The `FormArray` of item `FormGroup`s mirroring `items`. */
	form: FormArray;
}

/**
 * Moves a control within a `FormArray` in place, preserving the control instance (and thus
 * its per-item UI state such as `selected`/`collapsed`).
 *
 * @param form `FormArray` to mutate.
 * @param fromIndex Current index of the control.
 * @param toIndex Target index of the control.
 */
export function moveControlInFormArray(form: FormArray, fromIndex: number, toIndex: number): void {
	const from = clamp(fromIndex, form.length - 1);
	const to = clamp(toIndex, form.length - 1);
	if (from === to) {
		return;
	}
	const control = form.at(from);
	form.removeAt(from, { emitEvent: false });
	form.insert(to, control, { emitEvent: false });
}

/**
 * Transfers a control from one `FormArray` to another in place, preserving the instance.
 *
 * @param source Source `FormArray`.
 * @param target Target `FormArray`.
 * @param fromIndex Index of the control in the source array.
 * @param toIndex Insertion index in the target array.
 */
export function transferControlBetweenFormArrays(
	source: FormArray,
	target: FormArray,
	fromIndex: number,
	toIndex: number
): void {
	const from = clamp(fromIndex, source.length - 1);
	const to = clamp(toIndex, target.length);
	if (!source.length) {
		return;
	}
	const control = source.at(from);
	source.removeAt(from, { emitEvent: false });
	target.insert(to, control, { emitEvent: false });
}
