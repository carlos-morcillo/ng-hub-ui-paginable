import { Key } from './models';

export function validateNonCharKeyCode(keyCode: string) {
	return [
		Key.Enter,
		Key.Tab,
		Key.ShiftLeft,
		Key.ShiftRight,
		Key.ArrowLeft,
		Key.ArrowUp,
		Key.ArrowRight,
		Key.ArrowDown,
		Key.MetaLeft,
		Key.MetaRight,
	].every((codeKey) => codeKey !== keyCode);
}

export function validateArrowKeys(keyCode: string) {
	return keyCode === Key.ArrowDown || keyCode === Key.ArrowUp;
}

export function isIndexActive(index: number, currentIndex: number) {
	return index === currentIndex;
}

export function isEnterKey(event: KeyboardEvent) {
	return event.code === Key.Enter;
}

export function isEscapeKey(event: KeyboardEvent) {
	// tslint:disable-next-line: deprecation
	return event.code === Key.Escape;
}

export const NO_INDEX = -1;
export function resolveNextIndex(currentIndex: number, stepUp: boolean, listLength = 10) {
	const step = stepUp ? 1 : -1;
	const topLimit = listLength - 1;
	const bottomLimit = NO_INDEX;
	const currentResultIndex = currentIndex + step;
	let resultIndex = currentResultIndex;
	if (currentResultIndex === topLimit + 1) {
		resultIndex = bottomLimit;
	}
	if (currentResultIndex === bottomLimit - 1) {
		resultIndex = topLimit;
	}
	return resultIndex;
}

export function toJsonpSingleResult(response: any) {
	return response[1];
}

export function toJsonpFinalResults(results: any[]) {
	return results.map((result: any) => result[0]);
}

export function hasCharacters(query: string) {
	return query.length > 0;
}

export function toFormControlValue(e: any) {
	return e.target.value;
}