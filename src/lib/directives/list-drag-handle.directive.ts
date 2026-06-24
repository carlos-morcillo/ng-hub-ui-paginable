import { Directive } from '@angular/core';

/**
 * Marks an element inside a `hub-list` item template as the drag handle.
 *
 * When at least one handle is present in an item, a drag (native or pointer-based) only
 * starts when the gesture begins on the handle; dragging the rest of the row is ignored.
 * When no handle is declared, the whole row is draggable.
 *
 * Detection is DOM-based: the directive simply tags its host with the
 * `hub-list__drag-handle` class. The list checks `event.target.closest('.hub-list__drag-handle')`
 * on drag/pointer start, which works even though the template is content-projected.
 *
 * The host is intentionally **not** marked `draggable="false"`: with the native HTML5
 * drag-and-drop API, a `draggable="false"` descendant prevents the browser from starting a
 * drag from that area, which would make the handle — the one place a drag should start —
 * unusable. The draggable element is the list item ancestor; the handle just participates.
 *
 * @example
 * ```html
 * <ng-template listItemTpt let-item="data">
 *   <span hubListDragHandle>::</span>
 *   {{ item.name }}
 * </ng-template>
 * ```
 */
@Directive({
	selector: '[hubListDragHandle], [listDragHandle]',
	standalone: true,
	host: {
		class: 'hub-list__drag-handle'
	}
})
export class HubListDragHandleDirective {}
