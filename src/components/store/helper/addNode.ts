import * as uuid from "uuid";

const addNode: Common.ReducerHelper<{ style: Common.NodeStyle; type: Common.NodeType }> = (payload, state) => {
	const { style, type } = payload;
	const code = uuid.v4();
	const node: Common.Nodes = {
		style: { ...style, zIndex: Object.keys(state.nodes).length },
		data: {},
		type,
		previous: [],
		next: [],
	};

	const nodesCount = Object.keys(state.nodes).length;
	state.nodes[code] = node;

	state.currentNode = { code, ...node, xIndex: nodesCount, yIndex: nodesCount };
	return state;
};
export default addNode;
