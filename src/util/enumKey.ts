const isObject = (val: any) => !Array.isArray(val) && typeof val === "object";

const setResult = (result: Common.ResultType, key: string, val: any) => {
	const resultItem = result[key];
	if (resultItem !== undefined) {
		if (Array.isArray(resultItem) && resultItem.length >= 1) {
			resultItem.push(val as never);
		} else if (!Array.isArray(resultItem)) {
			result[key] = [resultItem, val];
		}
	} else {
		return (result[key] = val);
	}
};

const enumKey = <T>(val: T): Common.ResultType => {
	const result: Common.ResultType = {};

	const recuObj = (val: any, key = "", result: Common.ResultType): any => {
		// console.log(val);

		if (Array.isArray(val)) {
			return val.forEach((item) => {
				const nextKey = `${key}[]`;
				// const next = val[item];
				setResult(result, nextKey, item);
				return recuObj(item, nextKey, result);
			});
		} else if (isObject(val)) {
			const keys = Object.keys(val);

			return keys.forEach((item) => {
				const nextKey = key ? `${key}.${item}` : item;
				setResult(result, nextKey, val[item]);
				const next = val[item];
				return recuObj(next, nextKey, result);
			});
		} else {
			setResult(result, key, val);
		}
	};
	recuObj(val, "", result);
	return result;
};

export default enumKey;
