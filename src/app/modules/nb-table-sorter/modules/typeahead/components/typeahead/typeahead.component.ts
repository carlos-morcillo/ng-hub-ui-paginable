import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { concat, debounceTime, distinctUntilChanged, filter, finalize, map, takeWhile, tap } from 'rxjs/operators';
import { TypeaheadFooterDirective } from '../../directives/typeahead-footer.directive';
import { TypeaheadHeaderDirective } from '../../directives/typeahead-header.directive';
import { TypeaheadNoItemsDirective } from '../../directives/typeahead-no-items.directive';
import { TypeaheadOptionDirective } from '../../directives/typeahead-option.directive';
import { TypeaheadPlaceholderDirective } from '../../directives/typeahead-placeholder.directive';
import { Key } from '../../models';
import { hasCharacters, isEnterKey, isIndexActive, NO_INDEX, resolveNextIndex, toFormControlValue, validateArrowKeys, validateNonCharKeyCode } from '../../typeahead.utils';

@Component({
	selector: 'ng-typeahead, [ngTypeahead]',
	templateUrl: './typeahead.component.html',
	styleUrls: ['./typeahead.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TypeaheadComponent),
			multi: true
		}
	]

})
export class TypeaheadComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {

	showSuggestions = false;

	@Input() placeholder: string;
	@Input() list = [];
	@Input() bindValue: string;
	@Input() bindText: string;
	@Input() searchKeys: string[];
	@Input() listItemLabel = '';
	@Input() debounce = 512;
	@Input() allowEmpty = false;
	@Input() caseSensitive = false;
	@Input() displayOnFocus = false;
	@Input() minTermLength: number = 0;

	itemsChange$ = new Subject<void>();

	private _items: any[];
	@Input()
	get items(): any[] {
		return this._items;
	}
	set items(v: any[]) {
		this._items = v;
		this.itemsChange$.next();
		this._cdr.markForCheck();
	}

	@Output() change = new EventEmitter<string | any>();

	@ContentChild(TypeaheadOptionDirective, { read: TemplateRef }) optionTpt: TypeaheadOptionDirective;
	@ContentChild(TypeaheadHeaderDirective, { read: TemplateRef }) headerTpt: TypeaheadHeaderDirective;
	@ContentChild(TypeaheadFooterDirective, { read: TemplateRef }) footerTpt: TypeaheadFooterDirective;
	@ContentChild(TypeaheadNoItemsDirective, { read: TemplateRef }) noItemsTpt: TypeaheadNoItemsDirective;
	@ContentChild(TypeaheadPlaceholderDirective, { read: TemplateRef }) placeholderTpt: TypeaheadPlaceholderDirective;

	value: any;
	isDisabled: boolean;
	onChange = (_: any) => { }
	onTouch = () => { }

	private suggestionIndex = 0;
	private activeResult = '';
	query: string = '';
	private resultsAsItems: any[] = [];
	keyDown$: Observable<KeyboardEvent>;
	keyUp$: Observable<KeyboardEvent>;

	@ViewChild('searchInput') searchInput!: ElementRef;

	results: any[];
	results$: Subscription;

	constructor(
		private _cdr: ChangeDetectorRef,
		private _elementRef: ElementRef
	) { }

	ngOnInit() { }

	ngAfterViewInit(): void {
		this.keyDown$ = fromEvent(this.searchInput.nativeElement, 'keydown');
		this.keyUp$ = fromEvent(this.searchInput.nativeElement, 'keyup');

		this.results$ = merge(
			timer(0),
			this.itemsChange$,
			fromEvent(this.searchInput.nativeElement, 'keydown').pipe(
				tap((e: KeyboardEvent) => e.code === Key.Backspace && !this.query.length ? this.value = null : null),
				tap((e: KeyboardEvent) => {
					if (isEnterKey(e)) {
						this.handleSelectSuggestion(this.activeResult);
						e.stopImmediatePropagation();
					}
				}),
				tap((e: KeyboardEvent) => e.code === Key.Backspace && !this.query.length ? this.value = null : null),
				filter((e: KeyboardEvent) => validateNonCharKeyCode(e.code)),
				filter((_) => this.query.length >= this.minTermLength),
			),
			fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
				tap((e: KeyboardEvent) => validateArrowKeys(e.key) && this.updateIndex(e.key)),
				filter((e: KeyboardEvent) => validateNonCharKeyCode(e.code)),
				map(toFormControlValue),
				debounceTime(this.debounce),
			)
		).pipe(
			map((o) => {
				return this.items ? this.filterItems(this.items, this.query) : null;
			}),
			tap((o) => {
				this.results = o;
				this._cdr.markForCheck();
			}),
		).subscribe();
	}



	ngOnDestroy() {
		this.results$.unsubscribe();
	}

	writeValue(value: any = null): void {
		if (value) {
			value = this.bindValue ? (value[this.bindValue] ?? null) : value
		}
		this.value = value;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	navigateWithArrows(elementObs: Subject<KeyboardEvent>) {
		elementObs.pipe(
			map((e: any) => e.key),
			filter((key: Key) => validateArrowKeys(key))
		).subscribe((key: Key) => {
			this.updateIndex(key);
			this.displaySuggestions();
		});
	}

	updateIndex(keyCode: string) {
		this.suggestionIndex = resolveNextIndex(
			this.suggestionIndex,
			keyCode === Key.ArrowDown,
			this.results.length
		);
	}

	displaySuggestions() {
		this.showSuggestions = true;
		this._cdr.markForCheck();
	}

	markIsActive(index: number, result: string) {
		const isActive = isIndexActive(index, this.suggestionIndex);
		if (isActive) {
			this.activeResult = result;
		}
		return isActive;
	}

	handleSelectionClick(suggestion: string, index: number) {
		this.suggestionIndex = index;
		this.handleSelectSuggestion(suggestion);
	}

	handleSelectSuggestion(suggestion: string) {
		const result = this.resultsAsItems.length ? this.resultsAsItems[this.suggestionIndex] : suggestion;
		this.hideSuggestions();
		const resolvedResult = this.suggestionIndex === NO_INDEX ? this.query : result;
		this.change.emit(resolvedResult);
		this.value = (this.bindValue && resolvedResult[this.bindValue] || resolvedResult) ?? null;
		this.onChange(this.value);
		this.onTouch();
		this.query = '';
	}

	hideSuggestions() {
		this.showSuggestions = false;
	}

	filterItems(list: any[], needle: string): string[] {
		needle = this.caseSensitive ? needle : needle.toLowerCase();
		return list.filter((item: string | object) => {
			if (typeof item === 'string') {
				return item.includes(needle);
			}
			if (item !== null && typeof item === 'object') {
				const keys = this.searchKeys?.length ? this.searchKeys : Object.keys(item);
				return keys.some(k => item[k]?.toString().toLowerCase().indexOf(needle) > -1 ?? false);
			}
			return false;
		});
	}

	/**
	* Evento que muestra/oculta los resultados
	*
	* @param {*} event
	* @memberof NgFabComponent
	*/
	@HostListener('document:click', ['$event'])
	onClick(event: any) {
		if (this.showSuggestions && !this._elementRef.nativeElement.contains(event.target)) {
			this.hideSuggestions();
			this.query = '';
			this.itemsChange$.next();
		} else if (!this.showSuggestions && this._elementRef.nativeElement.contains(event.target)) {
			this.displaySuggestions();
		}
	}
}
