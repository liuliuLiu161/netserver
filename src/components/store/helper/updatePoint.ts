const updatePoint: Common.ReducerHelper<{
	pointCode: string;
	point: Partial<Common.Point>;
}> = (payload, state) => {
	const { currentNode, nodes } = state;
	const { pointCode, point } = payload;
	if (!currentNode) {
		return state;
	}
	const { code } = currentNode;
	const node = nodes[code];
	const { point: points } = node;

	if (!points) {
		return state;
	}

	points[pointCode] = {
		...points[pointCode],
		...point,
	};

	return state;
};
export default updatePoint;
