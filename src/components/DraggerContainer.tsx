import React, { useEffect, useState } from "react";
import { renderEndlessLine, renderNodes } from "./drawer";
import { Action } from "./store";
import { isIncludeBox } from "./store/helper/common";

type PointeCache = Common.PointStyle & { code: string };

let pointCache: null | PointeCache = null;

let previousNode: null | Components.CurrentNode = null;

const DraggerContainer: React.FC<{
	canvasRef: React.RefObject<HTMLCanvasElement>;
	dispatch: Action;
	nodeIns: Components.ContextState;
	ctx: CanvasRenderingContext2D | null;
}> = (props) => {
	const { canvasRef, children, dispatch, ctx, nodeIns } = props;
	const { currentNode } = nodeIns;
	// const {} =
	const [isMoving, setMove] = useState(false);

	const [canDrawLine, setCanDrawLine] = useState(false);

	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const rect = canvas.getBoundingClientRect();
		const { left, top } = rect;
		setCanvasOffset({
			x: left,
			y: top,
		});
	}, [canvasRef]);

	const handleMouseDown = (e: React.MouseEvent) => {
		e.stopPropagation();
		const { pageX, pageY } = e;

		if (!currentNode) return;
		const { style } = currentNode;

		if (isIncludeBox(style, { x: pageX - canvasOffset.x, y: pageY - canvasOffset.y })) {
			setMove(true);
		}
	};

	const handleClick = (e: React.MouseEvent) => {
		const { x, y } = canvasOffset;
		const { pageX, pageY } = e;
		const realX = pageX - x;
		const realY = pageY - y;

		dispatch("selectNode", {
			x: realX,
			y: realY,
		});

		if (!currentNode) {
			return;
		}
		const { point: points } = currentNode;
		if (!points) {
			return;
		}
		const hasPointCode = Object.keys(points).find((code) => {
			const point = points[code];
			const { x, y } = point.style;
			const radin = 7;
			return Math.abs(x - realX) < radin && Math.abs(y - realY) < radin;
		});
		if (!hasPointCode) {
			return;
		}
		// updatePointsCache(nodeIns.nodes);
		// pointCache = points[hasPointCode].style;
		if (!canDrawLine) {
			setCanDrawLine(true);
			previousNode = currentNode;
			pointCache = { code: hasPointCode, ...points[hasPointCode].style };
		} else {
			console.log("triggeer", currentNode.code);
			dispatch("updateNodePrevious", {
				nodeCode: previousNode?.code,
				currentPointCode: hasPointCode,
				pointCode: pointCache?.code,
			});
			setCanDrawLine(false);
			pointCache = null;
		}
	};

	const handleMove = (e: React.MouseEvent) => {
		e.stopPropagation();
		const { pageX, pageY } = e;
		const { x, y } = canvasOffset;
		const realX = pageX - x;
		const realY = pageY - y;
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		if (!ctx) return;
		if (!currentNode) return;
		if (isMoving) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			dispatch("updateNodes", { x: pageX - x, y: pageY - y });
			return;
		} else {
			if (!canDrawLine && !pointCache) {
				return;
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			renderEndlessLine(
				ctx,
				{
					x: realX,
					y: realY,
					color: "",
				},
				{
					...(pointCache as any),
				}
			);
			renderNodes(ctx, nodeIns.nodes);
		}
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!currentNode) return;

		setMove(false);
	};

	return (
		<div onClick={handleClick}>
			<div className="canvasContainer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMove}>
				{children}
			</div>
		</div>
	);
};
export default DraggerContainer;
