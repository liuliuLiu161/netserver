import { set } from "lodash";
import enumKey from "util/enumKey";
// import { anaylzePath } from "../../../util";

const anaylzePath = (path: string) => {
	const pathArray = path.split(".").reverse();
	const arrayReg = /\[\]/;
	let arrayCount = 0;
	//TODO: Revers target path and get real target valve address
	pathArray.forEach((item) => {
		const isArray = arrayReg.test(item);
		if (isArray) {
			arrayCount++;
		}
		if (arrayCount > 1 && isArray) {
			//Default set previous array 0 index
			item = item.replace("[]", "[0]");
		}
	});
	const tempArr = pathArray.reverse().join(".");
	return (index = NaN) => {
		if (isNaN(index)) {
			return tempArr;
		} else {
			return tempArr.replace("[]", `[${index}]`);
		}
	};
};

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
			// console.log(JSON.stringify(result), realResultPath(i));
			result = set(result, realResultPath(i), val);
		}
	} else {
		result = set(result, realResultPath(), value);
	}

	return result;
};

// const plusOperation = (aux: Common.PlusOperationAuxiliary) => {
// 	return "value";
// };
// const rangesOperation = (val: any[], range: number[]) => {
// 	const start = range[0];
// 	const end = range[1];
// 	const newData = val.slice(start, end + 1);
// 	return newData.reduce((prev, cur, index) => {
// 		return { ...prev, [`val[${index}]`]: cur };
// 	}, {});
// };

// const resolveCalcNode = (operation: Common.OperationAuxiliary["name"], operationAuxiliary: Common.OperationAuxiliary, path: string, prevPath: string, auxiliary: Common.ResultType) => {
// 	switch (operation) {
// 		case "plus":
// 			return plusOperation(operationAuxiliary as Common.PlusOperationAuxiliary);
// 		case "range-map":
// 			return rangesOperation(auxiliary[prevPath] as any[], (operationAuxiliary as Common.RangeOperationAuxiliary).range);
// 		default:
// 			break;
// 	}
// };

export const convertNodeMap = (previous: Common.Previous[], nodes: Common.NodesMap, currentNode: Common.Nodes) => {
	for (const item of previous) {
		const prevNode = nodes[item.code];
		const { point, type } = currentNode;
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
		if (type === "data") {
			const newCache = generateData(auxiliary, prevPath, path, cache);
			currentNode.data.cache = newCache;
			currentNode.data.auxiliary = enumKey(newCache);
		}
	}
};
