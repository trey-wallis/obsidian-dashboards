import { css } from "@emotion/react";

import { Container, ContainerType } from "src/shared/state/types";
import React from "react";
import { EVENT_CTRL_DOWN, EVENT_CTRL_UP } from "src/shared/constants";
import { TFile } from "obsidian";
import ContainerContent from "./container-content";
import EmptyContainerContent from "./empty-container-content";
import { createContainer } from "src/shared/state/state-factory";
import { useMountState } from "../mount-provider";

interface Props {
	container?: Container;
	showBorders: boolean;
	position: number;
	gridY: number;
	onAddContainer: (value: Container) => void;
	onRemoveContainer: (id: string) => void;
}

export default function Container({
	container,
	position,
	showBorders,
	gridY,
	onAddContainer,
	onRemoveContainer,
}: Props) {
	const { app } = useMountState();
	const [isCtrlDown, setCtrlDown] = React.useState(false);
	const [isHovered, setHovered] = React.useState(false);

	function handleCodeBlockModalSave(value: string) {
		const container = createContainer(
			ContainerType.CODE_BLOCK,
			position,
			value
		);
		onAddContainer(container);
	}

	function handleLinkModalSave(value: string) {
		const container = createContainer(ContainerType.LINK, position, value);
		onAddContainer(container);
	}

	function handleFileModalSave(value: TFile) {
		const container = createContainer(
			ContainerType.FILE,
			position,
			value.path
		);
		//const resourcePath = app.vault.adapter.getResourcePath(value.path);
		//app.metadataCache.getFirstLinkpathDest(href, view.file.path);
		onAddContainer(container);
	}

	React.useEffect(() => {
		function handleCtrlDown() {
			setCtrlDown(true);
		}

		function handleCtrlUp() {
			setCtrlDown(false);
		}

		//@ts-expect-error Not native Obsidian event
		app.workspace.on(EVENT_CTRL_DOWN, handleCtrlDown);
		//@ts-expect-error Not native Obsidian event
		app.workspace.on(EVENT_CTRL_UP, handleCtrlUp);
		return () => {
			app.workspace.off(EVENT_CTRL_DOWN, handleCtrlDown);
			app.workspace.off(EVENT_CTRL_UP, handleCtrlUp);
		};
	}, []);

	const [height, setHeight] = React.useState(0);
	const ref = React.useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.clientHeight);
		}
	}, []);

	return (
		<div
			ref={ref}
			css={css`
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				${showBorders
					? "border: 1px solid var(--background-modifier-border);"
					: ""}
			`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{container === undefined && (
				<EmptyContainerContent
					onCodeBlockModalSave={handleCodeBlockModalSave}
					onLinkModalSave={handleLinkModalSave}
					onFileModalSave={handleFileModalSave}
				/>
			)}
			{container && (
				<ContainerContent
					isCtrlDown={isCtrlDown}
					height={height}
					isHovered={isHovered}
					container={container}
					gridY={gridY}
					onRemoveClick={() => onRemoveContainer(container.id)}
				/>
			)}
		</div>
	);
}
