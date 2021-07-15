import { renderNodes } from "components/Node";
import addNode from "./helper/addNode";
import { updateCurrentNode, updateNodes } from "./helper/updateNode";

export default class Nodes implements Components.ContextState {
	// private nodes!: Components.ContextState;
	canvas: Components.ContextState["canvas"] = null;
	attr = {
		clickX: NaN,
		clickY: NaN,
		offsetX: NaN,
		offsetY: NaN,
	};
	dragger: Components.ContextState["dragger"] = {
		node: null,
	};
	currentNode: Components.ContextState["currentNode"] = null;
	overlay = {};
	nodes: Components.ContextState["nodes"] = {};
	nodesOffset: Components.ContextState["nodesOffset"] = {
		xArray: [],
		yArray: [],
		x2Array: [],
		y2Array: [],
	};
	constructor(nodes?: Components.ContextState) {
		if (!nodes) return this;
		const { canvas, attr, dragger, currentNode, overlay, nodes: nodesData, nodesOffset } = nodes;
		this.attr = attr;
		this.canvas = canvas;
		this.dragger = dragger;
		this.nodes = nodes;
		this.nodesOffset = nodesOffset;
		this.overlay = overlay;
		this.currentNode = currentNode;
		this.nodes = nodesData;
		return this;
	}

	getNodes = () => {
		return {
			canvas: this.canvas,
			attr: this.attr,
			dragger: this.dragger,
			currentNode: this.currentNode,
			overlay: this.overlay,
			nodes: this.nodes,
			nodesOffset: this.nodesOffset,
		};
	};

	addNode = (payload: { style: Common.NodeStyle }) => new Nodes(addNode(payload, this));
	// addNode = (payload: { style: Common.NodeStyle }) => addNode(payload, this);

	updateNodes = (payload: { x: number; y: number }) => new Nodes(updateNodes(payload, this));
	// updateNodes = (payload: { x: number; y: number }) => updateNodes(payload, this);

	updateCurrentNodes = (payload: Common.Nodes) => new Nodes(updateCurrentNode(payload, this));
	// updateCurrentNodes = (payload: Common.Nodes) => updateCurrentNode(payload, this);

	renderNodes = () => {
		if (!this.canvas) {
			console.warn("The canvas context is null . Nodes won't update");
			return this;
		}
		renderNodes(this.canvas, this.nodes);
		return new Nodes(this);
		// return this;
	};

	initialCanvas = (context: Components.ContextState["canvas"]) => {
		this.canvas = context;
		return new Nodes(this);
		// return this;
	};
}

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
