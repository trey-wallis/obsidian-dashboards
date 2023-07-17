import React from "react";

import { css } from "@emotion/react";

import { AppState } from "src/shared/state/types";
import Table from "./table/table";
import OptionBar from "./option-bar/option-bar";
import { getNumContainersX, getNumContainersY } from "./table/table-utils";

interface Props {
	initialState: AppState;
	onStateChange: (state: AppState) => void;
}

export default function App({ initialState, onStateChange }: Props) {
	const [state, setState] = React.useState(initialState);

	React.useEffect(() => {
		onStateChange(state);
	}, [state]);

	const { layout, data, showBorders, borderSpacing } = state;
	const numContainersX = getNumContainersX(layout);
	const numContainersY = getNumContainersY(layout);

	return (
		<div
			className="Dashboards__app"
			css={css`
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
			`}
		>
			<OptionBar
				borderSpacing={borderSpacing}
				layout={layout}
				onLayoutChange={(value) =>
					setState((prevState) => {
						return {
							...prevState,
							layout: value,
						};
					})
				}
				onToggleBorder={() =>
					setState((prevState) => {
						return {
							...prevState,
							showBorders: !prevState.showBorders,
						};
					})
				}
				onBorderSpacingChange={(value) =>
					setState((prevState) => {
						return {
							...prevState,
							borderSpacing: value,
						};
					})
				}
			/>
			<Table
				data={data}
				borderSpacing={borderSpacing}
				showBorders={showBorders}
				numContainersX={numContainersX}
				numContainersY={numContainersY}
				onAddContainer={(container) => {
					setState((prevState) => {
						return {
							...prevState,
							data: [...prevState.data, container],
						};
					});
				}}
				onRemoveContainer={(id) => {
					setState((prevState) => {
						return {
							...prevState,
							data: prevState.data.filter(
								(container) => container.id !== id
							),
						};
					});
				}}
			/>
		</div>
	);
}
