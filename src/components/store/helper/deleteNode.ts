const deleteNode: Common.ReducerHelper<string> = (payload, state) => {
	if (!payload) {
		return state;
	}
	state.currentNode = null;
	const node = state.nodes[payload];
	const { next } = node;
	if (next) {
		for (const item of next) {
			state.nodes[item.code].previous?.splice(item.index, 1);
		}
	}

	delete state.nodes[payload];
	console.log(Object.keys(state.nodes));

	return state;
};
export default deleteNode;
