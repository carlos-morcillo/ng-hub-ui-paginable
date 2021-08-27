export interface View {
	key: string;
	name: string;
	conditions: Array<{
		key: string;
		operation: 'equal' | 'variable';
		value: string;
		[key: string]: string;
	}>
}