import React, { useReducer } from "react";
import reduce from "./store/reducer";

const initialState: Components.ContextState = {
	canvas: null,
	attr: {
		clickX: NaN,
		clickY: NaN,
		offsetX: NaN,
		offsetY: NaN,
	},
	dragger: {
		node: null,
	},
	currentNode: null,
	overlay: {},
	nodes: {},
	nodesOffset: {
		xArray: [],
		// yArray: [],
		// x2Array: [],
		// y2Array: [],
	},
};

export const CanvasContext = React.createContext(initialState);

const CanvasProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(reduce, initialState);
	return <CanvasContext.Provider value={state as any}>{children(state, dispatch)}</CanvasContext.Provider>;
};

export default CanvasProvider;
