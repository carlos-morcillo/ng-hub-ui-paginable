/**
 * The Pointer Events touch/pen drag fallback now lives in the shared `ng-hub-ui-utils`
 * drag-and-drop core. Re-exported here so existing list imports keep working.
 */
export { createPointerDragSession } from 'ng-hub-ui-utils';
export type { PointerDragSession, PointerDragSessionConfig } from 'ng-hub-ui-utils';
