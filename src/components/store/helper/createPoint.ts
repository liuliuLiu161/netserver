// import enumKey from "util/enumKey";
import { calcPointCoord } from "util/pointsOperation";
import { v4 } from "uuid";

export const createOutputPoint: Common.ReducerHelper<{ source: Common.ResultType; type: "input" | "output"; sourceData: any }> = (payload, state) => {
	const { currentNode, nodes } = state;
	const { source, type, sourceData } = payload;
	if (!currentNode) {
		return state;
	}
	const pointGap = 30;
	const sourceKeys = Object.keys(source);
	const sourceKeyCount = sourceKeys.length;
	const { code } = currentNode;
	const node = nodes[code];
	const { style } = node;
	const newNodeHeight = (sourceKeyCount + 1) * pointGap + 60;
	const newPoints: Common.Points = node.point ? { ...node.point } : {};
	for (let i = 0; i < sourceKeyCount; i++) {
		const path = sourceKeys[i];
		const pointStyle: Common.PointStyle = {
			x: style.x,
			y: style.y,
			color: type === "input" ? "#fff" : "#000",
		};

		const newPoint: Common.Point = {
			path,
			style: pointStyle,
			type,
		};

		newPoints[v4()] = newPoint;
	}
	const coords = calcPointCoord(newPoints, { ...style, height: newNodeHeight });
	for (const code in coords) {
		newPoints[code].style = { ...newPoints[code].style, ...coords[code] };
	}
	node.point = { ...node.point, ...newPoints };
	node.style.height = newNodeHeight;
	node.data.auxiliary = source;
	node.data.cache = sourceData;
	return state;
};

export const createInputPoint: Common.ReducerHelper<{ path: string; type: "input" | "output" }> = (payload, state) => {
	console.log("trigger");
	const { currentNode, nodes } = state;
	const { path, type } = payload;
	if (!currentNode) {
		return state;
	}
	const { code } = currentNode;
	const node = nodes[code];
	const { point: points, style } = node;

	const sourceKeyCount = points ? Object.keys(points).length : 1;
	const newNodeHeight = (sourceKeyCount + 1) * 30;

	const pointStyle: Common.PointStyle = {
		x: style.x + 7,
		y: style.y + style.height / 2,
		color: type === "input" ? "#fff" : "#000",
	};

	const newPoint: Common.Point = {
		path,
		style: pointStyle,
		type,
	};

	if (!points) {
		console.log(newPoint);
		node.point = { [v4()]: newPoint };
		return state;
	}
	points[v4()] = newPoint;
	const coords = calcPointCoord(points, { ...style, height: newNodeHeight });
	for (const code in coords) {
		points[code].style = { ...points[code].style, ...coords[code] };
	}
	node.style.height = newNodeHeight;
	currentNode.style.height = newNodeHeight;

	return state;
};
