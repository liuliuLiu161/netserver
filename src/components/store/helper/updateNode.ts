const updateNode: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { currentNode } = state;
	const { x, y } = payload;

	if (!currentNode) {
		return;
		// console.log(JSON.stringify(state.nodesOffset.xArray));
	}
	const code = currentNode.data.code;
	const { style } = currentNode;
	const { x: oldx, y: oldy } = style;
	state.nodes[code].style = {
		...state.nodes[code].style,
		x,
		y,
	};
	currentNode.style = {
		...currentNode.style,
		x,
		y,
	};
	// const
};
export default updateNode;
