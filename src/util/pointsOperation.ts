export const calcPointCoord = (points: Common.Points, nodeStyle: Common.NodeStyle) => {
	const pointCodes = Object.keys(points);
	const pointCount = pointCodes.length;
	const { x, y, width, height } = nodeStyle;
	const result = {
		x,
		y,
	};
	for (let i = 0; i < pointCount; i++) {
		const code = pointCodes[i];
		const { type } = points[code];
		const radin = 7; // TODO: Point radin is editorable
		const pointGap = Math.floor(height / pointCount);
		if (type === "input") {
			result.x -= radin;
		} else {
			result.x += radin + width;
		}
		result.y += (i + 1) * (pointGap - radin);
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
