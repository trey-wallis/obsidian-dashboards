import React from "react";

import { css } from "@emotion/react";

import { AppState } from "src/shared/types";
import Table from "./table";
import OptionBar from "./option-bar";
import { getNumContainersX, getNumContainersY } from "./table-utils";

interface Props {
	initialState: AppState;
	onStateChange: (state: AppState) => void;
}

export default function App({ initialState, onStateChange }: Props) {
	const [state, setState] = React.useState(initialState);

	React.useEffect(() => {
		onStateChange(state);
	}, [state]);

	const { layout, data } = state;
	const numContainersX = getNumContainersX(layout);
	const numContainersY = getNumContainersY(layout);

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
			`}
		>
			<OptionBar
				layout={layout}
				onLayoutChange={(value) =>
					setState((prevState) => {
						return {
							...prevState,
							layout: value,
						};
					})
				}
			/>
			<Table
				data={data}
				numContainersX={numContainersX}
				numContainersY={numContainersY}
			/>
		</div>
	);
}
