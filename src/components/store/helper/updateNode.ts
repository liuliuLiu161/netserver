export const updateNodes: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { currentNode } = state;
	const { x, y } = payload;
	if (!currentNode) {
		return state;
	}
	const { data } = currentNode;
	const { code } = data;
	const newStyle = {
		...state.nodes[code].style,
		x,
		y,
	};
	state.nodes[code].style = newStyle;
	return state;
};

const updateOffsetArray = (
	offsetArray: Components.NodesOffsetSortedItem[],
	newNode: {
		data: Common.NodeData;
		offset: number;
	}
) => {
	const { offset, data } = newNode;
	const { code } = data;
	// debugger;
	const newNodeIndex = offsetArray.findIndex((item) => item.code === code);
	if (newNodeIndex !== -1) {
		offsetArray[newNodeIndex].offset = offset;
	}
	return offsetArray;
};

export const updateCurrentNode: Common.ReducerHelper<Common.Nodes> = (payload, state) => {
	const { currentNode, nodesOffset } = state;
	const {
		xArray,
		// yArray, x2Array, y2Array
	} = nodesOffset;
	if (!currentNode) {
		return state;
	}
	const { data } = currentNode;

	const { style: currStyle } = payload;
	const { x, y, height, width } = currStyle;

	state.currentNode = { ...payload };

	state.nodesOffset = {
		xArray: updateOffsetArray(xArray, {
			data,
			offset: x,
		}).sort((curr, next) => curr.offset - next.offset),
		// yArray: updateOffsetArray(yArray, {
		// 	data,
		// 	offset: y,
		// }).sort((curr, next) => curr.offset - next.offset),
		// y2Array: updateOffsetArray(y2Array, {
		// 	data,
		// 	offset: y + height,
		// }).sort((curr, next) => curr.offset - next.offset),
		// x2Array: updateOffsetArray(x2Array, {
		// 	data,
		// 	offset: x + width,
		// }).sort((curr, next) => curr.offset - next.offset),
	};
	return state;
};
