import { Pipe, PipeTransform } from '@angular/core';
import { isObservable } from 'rxjs';

@Pipe({
	name: 'isObservable',
	standalone: true
})
export class IsObservablePipe implements PipeTransform {
	transform(value: unknown): boolean {
		return isObservable(value);
	}
}
