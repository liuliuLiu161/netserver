import { binarySearch } from "./common";

const getValidOffset = (offset: number, length: number) => {
	if (offset < 0 && length === 1) {
		return 0;
	}
	if (offset >= length) {
		return length - 1;
	}
	return offset;
};
const getValidIndex = (offset: number, arr: any[]) => {
	const index = binarySearch({ code: "", offset }, arr);
	const validIndex = getValidOffset(index, arr.length);
	const isValidIndex = validIndex !== -1;
	return { validIndex, isValidIndex };
};

const isIncludeBox = (box: Common.NodeStyle, position: { x: number; y: number }) => {
	const { x, y } = position;
	const { x: left, y: top, width, height } = box;

	return x >= left && x < left + width && top <= y && top + height >= y;
};

const selectNode: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { x } = payload;
	const { nodesOffset, nodes, currentNode } = state;
	const { xArray } = nodesOffset;

	const bounds = binarySearch({ code: "", offset: x }, xArray);
	let { validIndex: end, isValidIndex } = getValidIndex(bounds, xArray);
	console.log(end);
	state.currentNode = null;

	if (!isValidIndex) {
		state.currentNode = null;
		return state;
	}
	const newXArray = xArray.slice(0, end + 1);

	// if (currentNode && isIncludeBox(currentNode.style, payload)) {
	// 	return state;
	// }
	while (end >= 0) {
		const offsetCode = newXArray[end].code;
		const node = nodes[offsetCode];
		const { style } = node;
		console.log(JSON.stringify(style), JSON.stringify(payload), isIncludeBox(style, payload));

		if (isIncludeBox(style, payload)) {
			state.currentNode = node;
			return state;
		} else {
			state.currentNode = null;
			end--;
		}
	}
	console.log(currentNode);

	return state;
};
export default selectNode;
