export interface PaginableTableButton {
	title?: string;
	tooltip?: string;
	icon?: string;
	handler?: ((item?: any) => void);
	color?: string;
	hidden?: boolean | ((item: any) => boolean);
}
