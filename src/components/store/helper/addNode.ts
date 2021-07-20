import * as uuid from "uuid";

const addNode: Common.ReducerHelper<{ style: Common.NodeStyle }> = (payload, state) => {
	const { style } = payload;
	const code = uuid.v4();
	const node: Common.Nodes = {
		style: { ...style, zIndex: Object.keys(state.nodes).length },
		data: {},
		previous: [],
		next: {},
	};

	const nodesCount = Object.keys(state.nodes).length;
	state.nodes[code] = node;

	state.currentNode = { code, ...node, xIndex: nodesCount, yIndex: nodesCount };
	return state;
};
export default addNode;
