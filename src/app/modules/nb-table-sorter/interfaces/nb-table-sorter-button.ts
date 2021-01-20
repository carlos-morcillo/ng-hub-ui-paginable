export interface NbTableSorterButton {
	title?: string;
	icon?: string;
	handler?: any;
	color?: string;
	hidden?: boolean | ((item: any) => {});
}
