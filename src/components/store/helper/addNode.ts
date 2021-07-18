import * as uuid from "uuid";
import { insertOffsetArray } from "./common";

const addNode: Common.ReducerHelper<{ style: Common.NodeStyle }> = (payload, state) => {
	const { style } = payload;
	const code = uuid.v4();
	const node: Common.Nodes = {
		style: { ...style, zIndex: Object.keys(state.nodes).length },
		data: {
			code,
			previous: [],
			next: [],
		},
	};
	const {
		x,
		// , y, height, width
	} = style;
	const nodesCount = Object.keys(state.nodes).length;
	const newXArray = insertOffsetArray({ code, offset: x }, state.nodesOffset.xArray);
	// const newYArray = insertOffsetArray({ code, offset: y }, state.nodesOffset.yArray);
	// const newY2Array = insertOffsetArray({ code, offset: y + height }, state.nodesOffset.yArray);
	// const newX2Array = insertOffsetArray({ code, offset: x + width }, state.nodesOffset.yArray);
	state.nodes[code] = node;

	state.nodesOffset = {
		xArray: newXArray,
		// yArray: newYArray,
		// x2Array: newX2Array,
		// y2Array: newY2Array,
	};
	state.currentNode = { ...node, xIndex: nodesCount, yIndex: nodesCount };
	return state;
};
export default addNode;
