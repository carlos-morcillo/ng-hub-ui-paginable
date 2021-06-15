export interface NbTableSorterButton {
	title?: string;
	tooltip?: string;
	icon?: string;
	handler?: any;
	color?: string;
	hidden?: boolean | ((item: any) => {});
}
