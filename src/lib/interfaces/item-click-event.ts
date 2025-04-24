export interface ItemClickEvent<T = any> {
	depth?: number;
	index?: number;
	selected: boolean;
	collapsed: boolean;
	value: T;
	item: T;
}
