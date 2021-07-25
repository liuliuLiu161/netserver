import enumKey from "util/enumKey";

const updateNodeDataCache: Common.ReducerHelper<any> = (payload, state) => {
	const { currentNode } = state;
	// const {} = currentNode;
	if (!currentNode) {
		return state;
	}
	const { code } = currentNode;
	state.nodes[code].data.cache = payload;
	state.nodes[code].data.auxiliary = enumKey(payload);
	currentNode.data.cache = payload;
	currentNode.data.auxiliary = enumKey(payload);
	return state;
};

export default updateNodeDataCache;
