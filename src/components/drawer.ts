export const drawNode = (props: Common.NodeProps<Common.NodeContextState>) => {
	const { node, canvas, code } = props;
	const { style } = node;
	const { x, y, height, width } = style;
	const ctx = canvas;
	if (!ctx) {
		return;
	}
	ctx.fillStyle = "#000";
	ctx.fillText(code, x, y);
	ctx.fillStyle = "#f00";
	ctx.fillRect(x, y, width, height);
};

export const renderNodes = (ctx: CanvasRenderingContext2D, nodes: { [key: string]: Common.Nodes }) => {
	const codes = Object.keys(nodes);
	for (let index = 0; index < codes.length; index++) {
		const code = codes[index];
		const node = nodes[code];
		const { point, previous } = node;
		// ctx.beginPath();
		drawNode({
			code,
			canvas: ctx,
			node: node,
		});
		if (!point) {
			continue;
		}
		if (!previous) {
			continue;
		}
		renderLines(ctx, previous, point, nodes);
		renderPoints(ctx, point);
	}
	// ctx.closePath();
};

/**
 * Cx=Ax+(Bx-Ax)cosN+(By-Ay)sinN
 * Cy=Ay+(Bx-Ax)(-sinN)+(By-Ay)cosN
 * @param props
 */
export const drawLine = (props: Common.LineProps) => {
	const { start, end, canvas: ctx, color } = props;
	// const rad = (x: number, y: number) => Math.atan(y / x) * 180;
	// const x = start[0] + (end[0] - start[0]) * Math.cos(rad(start[0], start[1])) + (end[1] - start[1]) * Math.sin(rad(start[0], start[1]));
	// const y = start[0] + (end[0] - start[0]) * -Math.sin(rad(start[0], start[1])) + (end[1] - start[1]) * Math.cos(rad(start[0], start[1]));
	if (!ctx) {
		return;
	}
	ctx.beginPath();
	ctx.moveTo(start[0], start[1]);
	ctx.lineTo(end[0], end[1]);
	ctx.strokeStyle = color ? color : "#000";
	ctx.stroke();
	ctx.closePath();
};

const drawPoint = (props: Common.PointProps) => {
	const { x, y, canvas: ctx, color } = props;
	if (!ctx) {
		return;
	}
	ctx.beginPath();
	ctx.arc(x, y, 7, 0, 2 * Math.PI);
	ctx.fillStyle = color ? color : "#000";
	ctx.fill();
	ctx.closePath();
	// ctx.stroke();
};

export const renderPoints = (ctx: CanvasRenderingContext2D, points: Common.Points) => {
	for (const pointCode in points) {
		const point = points[pointCode];
		drawPoint({
			...point.style,
			canvas: ctx,
		});
	}
};

export const renderLines = (ctx: CanvasRenderingContext2D, lines: Common.Previous[], points: Common.Points, nodes: Common.NodesMap) => {
	for (const line of lines) {
		// const {} = line;
		const { pointCode, currentPointCode, code, style } = line;
		const startNode = nodes[code];
		if (!pointCode) {
			continue;
		}
		if (!startNode) {
			continue;
		}
		if (!startNode.point) {
			continue;
		}

		const { x, y } = startNode.point[pointCode].style;
		const { x: ex, y: ey } = points[currentPointCode].style;
		drawLine({
			start: [x, y],
			end: [ex, ey],
			canvas: ctx,
			color: style.color,
		});
	}
};

export const renderEndlessLine = (ctx: CanvasRenderingContext2D, endPonitStyle: Common.PointStyle, startPonitStyle: Common.PointStyle) => {
	drawLine({
		start: [startPonitStyle.x, startPonitStyle.y],
		end: [endPonitStyle.x, endPonitStyle.y],
		canvas: ctx,
		color: "#f0f",
	});
};
