import { binarySearch } from "./common";

export const updateNodes: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { currentNode } = state;
	const { x, y } = payload;

	if (!currentNode) {
		return;
		// console.log(JSON.stringify(state.nodesOffset.xArray));
	}
	const code = currentNode.data.code;

	state.nodes[code].style = {
		...state.nodes[code].style,
		x,
		y,
	};

	// const
};

export const updateCurrentNode: Common.ReducerHelper<Common.Nodes> = (payload, state) => {
	const { currentNode, nodesOffset } = state;
	const { xArray, yArray } = nodesOffset;
	if (!currentNode) {
		return;
	}
	const { yIndex, xIndex } = currentNode;

	const { style: currStyle, data } = payload;
	const { code } = data;
	const { x, y } = currStyle;
	const newXIndex = binarySearch(
		{
			offset: x,
			code,
		},
		xArray,
		Math.floor(xArray.length / 2)
	);
	const newYIndex = binarySearch(
		{
			offset: y,
			code,
		},
		yArray,
		Math.floor(xArray.length / 2)
	);
	if (newXIndex >= xArray.length) {
		xArray.push({
			code: code,
			offset: x,
		});
		yArray.push({
			code: code,
			offset: y,
		});
	} else {
		const tempXOffset = xArray[xIndex];
		const tempYOffset = yArray[yIndex];
		xArray[xIndex] = { code: code, offset: x };
		yArray[yIndex] = { code: code, offset: y };
		xArray[newXIndex] = tempXOffset;
		yArray[newYIndex] = tempYOffset;
	}
	state.currentNode = { ...payload, yIndex: newYIndex, xIndex: newXIndex };
};
