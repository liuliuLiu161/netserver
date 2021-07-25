import produce from "immer";
import { renderNodes } from "components/drawer";
import addNode from "./helper/addNode";
import {
	// updateCurrentNode,
	updateNodes,
} from "./helper/updateNode";
import { useState } from "react";
import selectNode from "./helper/selectNode";
// import { sampleData } from "__test__/nodeData";
import updateNodePrevious from "./helper/updateNodePrevious";
import { createPoint } from "./helper/createPoint";
import deleteNode from "./helper/deleteNode";
import updatePoint from "./helper/updatePoint";
import updateNodeDataCache from "./helper/updateNodeDataCache";

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
	// nodes: sampleData,
	nodes: {},
	nodesOffset: {
		xArray: [],
	},
};

const renderNode = (state: Components.ContextState) => {
	const { canvas: ctx, nodes } = state;
	if (!ctx) return;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	renderNodes(ctx, nodes);
};

const initialCanvas: Common.ReducerHelper<Components.ContextState["canvas"]> = (context, state) => {
	state.canvas = context;

	return state;
};

export const useDispatch = (): [state: Components.ContextState, action: Common.Action] => {
	const [newState, setState] = useState(initialState);

	// const needRenderNodes = (type: string) => {
	// 	const types = ["addNode", "updateNodes", "updateNodePrevious", "createOutputPoint", "createInputPoint"];
	// 	return types.includes(type);
	// };

	const actions: Common.Actions = {
		addNode,
		updateNodes,
		renderNode,
		initialCanvas,
		selectNode,
		updateNodePrevious,
		createPoint,
		deleteNode,
		updatePoint,
		updateNodeDataCache,
	};

	const handle = (type: keyof Common.Actions, payload?: any) => {
		const state = produce(newState, (draf: any) => {
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
				case "createPoint":
					draf = createPoint(payload, state);
					actions.renderNode(draf);
					break;
				case "deleteNode":
					draf = deleteNode(payload, state);
					actions.renderNode(draf);
					break;
				case "updatePoint":
					draf = updatePoint(payload, state);
					break;
				case "updateNodeDataCache":
					draf = updateNodeDataCache(payload, state);
					break;
				default:
					break;
			}
		});
		// console.log(JSON.stringify(state, null, 2));

		setState(state);
	};

	return [newState, handle];
};
