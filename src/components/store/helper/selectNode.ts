import { binarySearch } from "./common";

const searchNode = (
	arr: Components.NodesOffsetSortedItem[],
	nodes: { [code: string]: Common.Nodes },
	offset: {
		x: number;
		y: number;
	}
) => {
	const numArr = arr.sort((cur, acc) => nodes[cur.code].style.zIndex - nodes[acc.code].style.zIndex);
	const result = nodes[numArr[0].code];
	const { x, y } = offset;
	const { x: xOld, y: yOld, width, height } = result.style;
	if (x >= xOld && y >= yOld && x <= xOld + width && y <= yOld + height) {
		return nodes[numArr[0].code];
	}
	return null;
};

const getSubArray = (start: number, end: number, arr: Components.NodesOffsetSortedItem[]) => {
	if (start >= end) {
		return arr.slice(end, start + 1);
	} else {
		return arr.slice(start, end + 1);
	}
};

const selectNode: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { x, y } = payload;
	const { nodesOffset, nodes } = state;
	const { x2Array, xArray, y2Array, yArray } = nodesOffset;

	const leftX = binarySearch({ code: "", offset: x }, xArray);
	const leftY = binarySearch({ code: "", offset: y }, yArray);
	const rightX = binarySearch({ code: "", offset: x }, x2Array);
	const rightY = binarySearch({ code: "", offset: y }, y2Array);
	state.currentNode = null;

	if (rightY > x2Array.length) {
		//Don't select any nodes
		return state;
	}

	if (leftY < -1) {
		//Don't select any nodes
		return state;
	}

	if (rightX > x2Array.length) {
		//Don't select any nodes
		return state;
	}

	if (leftX < -1) {
		//Don't select any nodes
		return state;
	}
	console.log(
		leftX,
		x,
		xArray.map((item) => item.offset)
	);

	// if (leftX > -1 && leftX < xArray.length) {

	const xItem = xArray[leftX];
	const { code: xCode } = xItem;
	const xNode = nodes[xCode];
	const { y: nodeY, width, height } = xNode.style;

	const nodeYIndex = binarySearch({ code: "", offset: nodeY }, yArray);
	const nodeX2Index = binarySearch({ code: "", offset: x + width }, x2Array);
	const nodeY2Index = binarySearch({ code: "", offset: nodeY + height }, y2Array);
	const ySubArr = getSubArray(leftY, nodeYIndex, yArray);
	const y2SubArr = getSubArray(rightY, nodeY2Index, y2Array);
	const x2SubArr = getSubArray(leftX, nodeX2Index, x2Array);
	const searchArray = ySubArr.concat(y2SubArr, x2SubArr, xArray.slice(0, leftX));
	const result = searchNode(searchArray, nodes, {
		x,
		y,
	});
	// const yItem = yArray[leftY];
	// const { code: yCode } = yItem;

	state.currentNode = result;
	// }

	return state;
};
export default selectNode;
