import produce from "immer";
import { renderNodes } from "components/drawer";
import addNode from "./helper/addNode";
import {
	// updateCurrentNode,
	updateNodes,
} from "./helper/updateNode";
import { useState } from "react";
import selectNode from "./helper/selectNode";
import { sampleData } from "__test__/nodeData";
import updateNodePrevious from "./helper/updateNodePrevious";
import createOutputPoint from "./helper/createPoint";

export const initialState: Components.ContextState = {
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
	nodes: sampleData,
	nodesOffset: {
		xArray: [],
	},
};

interface Actions {
	addNode: Common.ReducerHelper<{
		style: Common.NodeStyle;
	}>;
	updateNodes: Common.ReducerHelper<{
		x: number;
		y: number;
	}>;
	renderNode(state: Components.ContextState): void;
	initialCanvas: Common.ReducerHelper<Components.ContextState["canvas"]>;
	selectNode: Common.ReducerHelper<{ x: number; y: number }>;
	updateNodePrevious: Common.ReducerHelper<{
		nodeCode: string;
		pointCode: string;
		currentPointCode: string;
	}>;
	createOutputPoint: Common.ReducerHelper<{ source: Common.ResultType; type: "input" | "output" }>;
}

export type Action = (type: keyof Actions, payload?: any) => void;

const renderNode = (state: Components.ContextState) => {
	const { canvas: ctx, nodes } = state;
	if (!ctx) return;
	renderNodes(ctx, nodes);
};

const initialCanvas: Common.ReducerHelper<Components.ContextState["canvas"]> = (context, state) => {
	state.canvas = context;
	return state;
};

export const useDispatch = (state: Components.ContextState): [state: Components.ContextState, action: Action] => {
	const [initialState, setState] = useState(state);

	const actions: Actions = {
		addNode,
		updateNodes,
		renderNode,
		initialCanvas,
		selectNode,
		updateNodePrevious,
		createOutputPoint,
	};

	const handle = (type: keyof Actions, payload?: any) => {
		const state = produce(initialState, (draf: any) => {
			const state: Components.ContextState = draf;
			switch (type) {
				case "addNode":
					draf = actions.addNode(payload, state);
					actions.renderNode(draf);
					break;
				case "renderNode":
					actions.renderNode(state);
					break;
				case "updateNodes":
					draf = actions.updateNodes(payload, state);
					// console.log(JSON.stringify(draf, null, 2));
					actions.renderNode(draf);
					break;
				case "initialCanvas":
					draf = actions.initialCanvas(payload, state);
					break;
				case "selectNode":
					draf = actions.selectNode(payload, state);
					break;
				case "updateNodePrevious":
					draf = actions.updateNodePrevious(payload, state);
					actions.renderNode(draf);
					break;
				case "createOutputPoint":
					draf = createOutputPoint(payload, state);
					actions.renderNode(draf);
					break;
				default:
					break;
			}
		});

		setState(state);
	};

	return [initialState, handle];
};
