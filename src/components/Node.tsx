import React, { useLayoutEffect } from "react";

export const drawNode = (props: Common.NodeProps<Common.NodeContextState>) => {
	const { code, node, canvas } = props;
	const { style, data } = node;
	const { x, y, height, width } = style;
	const ctx = canvas;
	if (!ctx) {
		return;
	}
	ctx.fillStyle = "#f00";
	ctx.fillRect(x, y, width, height);
};

export const renderNodes = (ctx: CanvasRenderingContext2D, nodes: { [key: string]: Common.Nodes }) => {
	console.log(nodes);

	const codes = Object.keys(nodes);
	for (let index = 0; index < codes.length; index++) {
		const code = codes[index];
		const item = nodes[code];
		drawNode({
			code,
			canvas: ctx,
			node: item,
		});
	}
};

/**
 * Cx=Ax+(Bx-Ax)cosN+(By-Ay)sinN
 * Cy=Ay+(Bx-Ax)(-sinN)+(By-Ay)cosN
 * @param props
 */
export const Line: React.FC<Common.LineProps> = (props) => {
	const { start, end, canvas } = props;
	// const rad = (x: number, y: number) => Math.atan(y / x) * 180;
	// const x = start[0] + (end[0] - start[0]) * Math.cos(rad(start[0], start[1])) + (end[1] - start[1]) * Math.sin(rad(start[0], start[1]));
	// const y = start[0] + (end[0] - start[0]) * -Math.sin(rad(start[0], start[1])) + (end[1] - start[1]) * Math.cos(rad(start[0], start[1]));
	useLayoutEffect(() => {
		const ctx = canvas;
		if (!ctx) {
			return;
		}
		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(end[0], end[1]);
		ctx.stroke();
	});
	return <></>;
};
