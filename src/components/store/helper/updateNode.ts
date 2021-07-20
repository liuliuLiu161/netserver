export const updateNodes: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { currentNode } = state;
	const { x, y } = payload;
	if (!currentNode) {
		return state;
	}
	const { code } = currentNode;
	// const { code } = data;
	const { x: oldX, y: oldY } = currentNode.style;
	const node = state.nodes[code];
	const { style, point: points } = node;
	const newStyle = {
		...style,
		x,
		y,
	};
	currentNode.style = {
		...currentNode.style,
		x,
		y,
	};
	node.style = newStyle;
	if (!points) {
		return state;
	}
	for (const pointCode in points) {
		const point = points[pointCode];
		point.style = {
			...point.style,
			x: point.style.x + x - oldX,
			y: point.style.y + y - oldY,
		};
	}
	return state;
};
