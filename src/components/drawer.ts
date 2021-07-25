import { nodeBoxOffsetHeight, pointRadin } from "util/constant";

export const drawNode = (props: Common.NodeProps<Common.Nodes>) => {
	const { node, canvas } = props;
	const { style, type, operation } = node;
	const { x, y, height, width } = style;
	const ctx = canvas;
	if (!ctx) {
		return;
	}

	// ctx.fillText("defult-data", x + width - textRect.width, y + height);
	ctx.fillStyle = type === "data" ? "#ceecf5" : "#c1e344";
	ctx.strokeStyle = "#111";
	roundRect(ctx, x, y, width, height, 5);
	ctx.font = type === "data" ? "bold 12px Microsoft-YaHei" : "bold 12px Microsoft-YaHei italic";
	ctx.fillStyle = "#222";
	const operationText = operation || "unknow";
	const text = type === "data" ? "defult-data" : operationText;
	const textRect = ctx.measureText(text);
	// ctx.fillText("defult-data", x + 5, y + 5);
	// ctx.font.fontcolor("#fff");

	ctx.fillText(text, x + (width - textRect.width) / 2, y + nodeBoxOffsetHeight);
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
	ctx.lineWidth = 2;
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
	ctx.arc(x, y, pointRadin, 0, 2 * Math.PI);
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

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = true] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius:
		| number
		| {
				tl: number;
				tr: number;
				br: number;
				bl: number;
		  },
	fill = true,
	stroke = true
) {
	if (typeof stroke === "undefined") {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	if (typeof radius === "number") {
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
	} else {
		const defaultRadius: typeof radius = { tl: 0, tr: 0, br: 0, bl: 0 };
		for (const side in defaultRadius) {
			(radius as any)[side] = (radius as any)[side] || (defaultRadius as any)[side];
		}
	}
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	if (fill) {
		ctx.fill();
	}
	if (stroke) {
		ctx.stroke();
	}
}
