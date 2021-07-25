import { pointRadin } from "./constant";

export const calcPointCoord = (points: Common.Points, nodeStyle: Common.NodeStyle) => {
	const pointCodes = Object.keys(points);
	const pointCount = pointCodes.length;
	const { x, y, width, height } = nodeStyle;
	const result: { [code: string]: { x: number; y: number } } = {};
	const pointGap = Math.floor(height / pointCount);
	for (let i = 0; i < pointCount; i++) {
		const code = pointCodes[i];
		const { type } = points[code];
		const radin = pointRadin; // TODO: Point radin is editorable
		result[code] = { x: 0, y: 0 };
		if (type === "input") {
			result[code].x = x + radin;
		} else {
			console.log("trigger");

			result[code].x = x + width - radin;
		}
		result[code].y = y + (i + 1) * (pointGap - radin);
		// console.log(result.y);
	}
	return result;
};

export const getAllPoint = (nodes: Common.NodesMap) => {
	const result = [];
	for (const nodeCode in nodes) {
		const node = nodes[nodeCode];
		const { point: points } = node;
		if (!points) {
			continue;
		}
		for (const pointCode in points) {
			result.push({
				pointCode,
				nodeCode,
			});
		}
	}
};
