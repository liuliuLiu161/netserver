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
	console.log(newPrevious);

	if (!previous) {
		node.previous = [newPrevious];
	} else {
		previous.push(newPrevious);
	}

	return state;
};
export default updateNodePrevious;
