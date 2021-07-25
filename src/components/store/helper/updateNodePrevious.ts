import { convertNodeMap } from "util/dataConvert";

const updateNodePrevious: Common.ReducerHelper<{
	nodeCode: string;
	pointCode: string;
	currentPointCode: string;
}> = (payload, state) => {
	const { currentNode, nodes } = state;
	if (!currentNode) {
		return state;
	}
	const { code } = currentNode;
	const { currentPointCode, nodeCode, pointCode } = payload;
	const node = nodes[code];

	const { previous, point: points } = node;

	if (nodeCode === code) {
		return state;
	}

	if (!points) {
		return state;
	}
	const newPrevious = {
		code: nodeCode,
		currentPointCode: currentPointCode,
		pointCode: pointCode,
		style: {
			color: "#000",
		},
	};

	const prevNode = nodes[nodeCode];
	if (!prevNode.next) {
		prevNode.next = [
			{
				code,
				index: 0,
			},
		];
	} else {
		prevNode.next.push({
			code,
			index: prevNode.next.length,
		});
	}
	if (!previous) {
		node.previous = [newPrevious];
	} else {
		previous.push(newPrevious);
	}
	convertNodeMap(previous as any, nodes, nodes[code]);
	return state;
};
export default updateNodePrevious;
