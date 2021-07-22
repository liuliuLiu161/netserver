import { set } from "lodash";
import enumKey from "util/enumKey";
import { anaylzePath } from "../../../util";

const generateData = (auxiliary: Common.ResultType, auxiliaryKey: string, resultKey: string, result: any) => {
	const value = auxiliary[auxiliaryKey];

	const resultKeyArr = resultKey.split(".");

	result = result || {};

	if (resultKeyArr[0] === "[]" && result === undefined) {
		result = [];
	}

	const realResultPath = anaylzePath(resultKey);

	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) {
			const val = value[i];
			result = set(result, realResultPath(i), val);
		}
	} else {
		console.log(result);
		result = set(result, realResultPath(), value);
		console.log(result, realResultPath(), value, value);
	}

	return result;
};

const convertNodeMap = (previous: Common.Previous[], nodes: Common.NodesMap, currentNode: Common.Nodes) => {
	for (const item of previous) {
		const prevNode = nodes[item.code];
		const { point } = currentNode;
		const { cache } = currentNode.data;
		const { auxiliary } = prevNode.data;
		const { currentPointCode, pointCode } = item;
		if (!auxiliary) {
			continue;
		}
		if (!point) {
			continue;
		}
		const { path } = point[currentPointCode];
		if (!prevNode.point) {
			continue;
		}
		const { path: prevPath } = prevNode.point[pointCode];
		const newCache = generateData(auxiliary, prevPath, path, cache);

		currentNode.data.cache = newCache;
		currentNode.data.auxiliary = enumKey(newCache);
	}
};

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

	if (nodeCode === code) {
		return state;
	}

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

	const prevNode = nodes[nodeCode];
	if (!prevNode.next) {
		prevNode.next = [
			{
				code,
				index: 0,
			},
		];
	} else {
		prevNode.next.push({
			code,
			index: prevNode.next.length,
		});
	}
	if (!previous) {
		node.previous = [newPrevious];
	} else {
		previous.push(newPrevious);
	}
	convertNodeMap(previous as any, nodes, nodes[code]);
	return state;
};
export default updateNodePrevious;
