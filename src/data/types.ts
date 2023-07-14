export interface Container {
	type: ContainerType;
	position: number;
	isVisible: boolean;
}

export enum ContainerType {
	LINK = "link",
	CODEBLOCK = "codeblock",
	FILE = "file",
}

export enum LayoutOptions {
	ONE_BY_TWO = "1x2",
	TWO_BY_ONE = "2x1",
	TWO_BY_TWO = "2x2",
	THREE_BY_ONE = "3x1",
	ONE_BY_THREE = "1x3",
	THREE_BY_TWO = "3x2",
	TWO_BY_THREE = "2x3",
	THREE_BY_THREE = "3x3",
}

export interface AppState {
	pluginVersion: string;
	layout: LayoutOptions;
	data: Container[];
}
