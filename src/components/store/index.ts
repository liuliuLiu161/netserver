import produce from "immer";
import { renderNodes } from "components/Node";
import addNode from "./helper/addNode";
import { updateCurrentNode, updateNodes } from "./helper/updateNode";
import { useState } from "react";
import selectNode from "./helper/selectNode";

// export default class Nodes implements Components.ContextState {
// 	// private nodes!: Components.ContextState;
// 	canvas: Components.ContextState["canvas"] = null;
// 	attr = {
// 		clickX: NaN,
// 		clickY: NaN,
// 		offsetX: NaN,
// 		offsetY: NaN,
// 	};
// 	dragger: Components.ContextState["dragger"] = {
// 		node: null,
// 	};
// 	currentNode: Components.ContextState["currentNode"] = null;
// 	overlay = {};
// 	nodes: Components.ContextState["nodes"] = {};
// 	nodesOffset: Components.ContextState["nodesOffset"] = {
// 		xArray: [],
// 		yArray: [],
// 		x2Array: [],
// 		y2Array: [],
// 	};
// 	constructor(nodes?: Components.ContextState) {
// 		if (!nodes) return this;
// 		const { canvas, attr, dragger, currentNode, overlay, nodes: nodesData, nodesOffset } = nodes;
// 		this.attr = attr;
// 		this.canvas = canvas;
// 		this.dragger = dragger;
// 		this.nodes = nodes;
// 		this.nodesOffset = nodesOffset;
// 		this.overlay = overlay;
// 		this.currentNode = currentNode;
// 		this.nodes = nodesData;
// 		return this;
// 	}

// 	getNodes = () => {
// 		return {
// 			canvas: this.canvas,
// 			attr: this.attr,
// 			dragger: this.dragger,
// 			currentNode: this.currentNode,
// 			overlay: this.overlay,
// 			nodes: this.nodes,
// 			nodesOffset: this.nodesOffset,
// 		};
// 	};

// 	addNode = (payload: { style: Common.NodeStyle }) => new Nodes(addNode(payload, this));
// 	// addNode = (payload: { style: Common.NodeStyle }) => addNode(payload, this);

// 	updateNodes = (payload: { x: number; y: number }) => new Nodes(updateNodes(payload, this));
// 	// updateNodes = (payload: { x: number; y: number }) => updateNodes(payload, this);

// 	updateCurrentNodes = (payload: Common.Nodes) => new Nodes(updateCurrentNode(payload, this));
// 	// updateCurrentNodes = (payload: Common.Nodes) => updateCurrentNode(payload, this);

// 	renderNodes = () => {
// 		if (!this.canvas) {
// 			console.warn("The canvas context is null . Nodes won't update");
// 			return this;
// 		}
// 		renderNodes(this.canvas, this.nodes);
// 		return new Nodes(this);
// 		// return this;
// 	};

// 	initialCanvas = (context: Components.ContextState["canvas"]) => {
// 		this.canvas = context;
// 		return new Nodes(this);
// 		// return this;
// 	};
// }

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
	nodes: {},
	nodesOffset: {
		xArray: [],
		yArray: [],
		x2Array: [],
		y2Array: [],
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
	updateCurrentNode: Common.ReducerHelper<Common.Nodes>;
	renderNode(state: Components.ContextState): void;
	initialCanvas: Common.ReducerHelper<Components.ContextState["canvas"]>;
	selectNode: Common.ReducerHelper<{ x: number; y: number }>;
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
	// state = Object.isFrozen(state) ? state : Object.freeze(state);

	const actions: Actions = {
		addNode,
		updateNodes,
		updateCurrentNode,
		renderNode,
		initialCanvas,
		selectNode,
	};

	const handle = (type: keyof Actions, payload?: any) => {
		const state = produce(initialState, (draf: any) => {
			const state = draf;
			switch (type) {
				case "addNode":
					draf = actions.addNode(payload, state);
					actions.renderNode(draf);
					break;
				case "renderNode":
					actions.renderNode(state);
					break;
				case "updateCurrentNode":
					draf = actions.updateCurrentNode(payload, state);
					actions.renderNode(draf);
					break;
				case "updateNodes":
					draf = actions.updateNodes(payload, state);
					actions.renderNode(draf);
					break;
				case "initialCanvas":
					draf = actions.initialCanvas(payload, state);
					break;
				case "selectNode":
					draf = actions.selectNode(payload, state);
					break;
				default:
					break;
			}
		});

		setState(state);
	};

	return [initialState, handle];
};
