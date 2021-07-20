import { calcPointCoord } from "util/pointsOperation";
import { v4 } from "uuid";

const createPoint = (payload: { source: Common.ResultType; type: "input" | "output" }, state: Components.ContextState) => {};

export const createOutputPoint: Common.ReducerHelper<{ source: Common.ResultType; type: "input" | "output" }> = (payload, state) => {
	const { currentNode, nodes } = state;
	const { source, type } = payload;
	if (!currentNode) {
		return state;
	}
	const sourceKeyCount = Object.keys(source).length;
	const { code } = currentNode;
	const node = nodes[code];
	const { style } = node;
	const newNodeHeight = sourceKeyCount * 30 + 60;
	const points = node.point;
	for (const path in source) {
		const pointStyle: Common.PointStyle = {
			x: style.x,
			y: style.y,
			color: type === "input" ? "#f0f" : "#000",
		};
		if (points) {
			const newPointStyle = calcPointCoord(points, { ...style, height: newNodeHeight });
			Object.assign(pointStyle, newPointStyle);
		}
		const newPoint: Common.Point = {
			path,
			style: pointStyle,
			type,
		};
		if (!points) {
			node.point = { [v4()]: newPoint };
			continue;
		}
		points[v4()] = newPoint;
	}
	node.style.height = newNodeHeight;
	return state;
};

export const createInputPoint: Common.ReducerHelper<{ path: string; type: "input" | "output" }> = (payload, state) => {
	const { currentNode, nodes } = state;
	const { path, type } = payload;
	if (!currentNode) {
		return state;
	}
	const { code } = currentNode;
	const { point: points, style } = nodes[code];
	if (!points) {
		return state;
	}
	const sourceKeyCount = Object.keys(points).length;

	return state;
};
