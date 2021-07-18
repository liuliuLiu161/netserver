import { useState } from "react";
import { Action } from "./store";
const DraggerContainer: React.FC<{
	canvasRef: React.RefObject<HTMLCanvasElement>;
	dispatch: Action;
	nodeIns: Components.ContextState;
	currentNode: Components.CurrentNode | null;
	ctx: CanvasRenderingContext2D | null;
	nodes: any;
}> = (props) => {
	const { canvasRef, children, currentNode, dispatch, ctx } = props;

	const [isMoving, setMove] = useState(false);

	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	});

	const handleMouseDown = () => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const rect = canvas.getBoundingClientRect();
		if (!rect) {
			return;
		}

		const { left, top } = rect;

		setCanvasOffset({
			x: left,
			y: top,
		});
		setMove(true);
	};

	const handleClick = (e: React.MouseEvent) => {
		const { x, y } = canvasOffset;
		const { pageX, pageY } = e;

		setMove(false);

		// dispatch("selectNode", {
		// 	x: pageX - x,
		// 	y: pageY - y,
		// });
	};

	const handleMove = (e: React.MouseEvent) => {
		if (!isMoving) return;
		const { pageX, pageY } = e;
		const { x, y } = canvasOffset;
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		if (!ctx) return;
		if (!currentNode) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		dispatch("updateNodes", { x: pageX - x, y: pageY - y });
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		if (!currentNode) return;
		const { pageX, pageY } = e;
		const { x, y } = canvasOffset;
		const { data, style } = currentNode;
		// dispatch("selectNode", {
		// 	x: pageX - x,
		// 	y: pageY - y,
		// });
		dispatch("updateCurrentNode", {
			data,
			style: {
				...style,
				x: pageX - x,
				y: pageY - y,
			},
		});
		setMove(false);
	};

	return (
		<div className="canvasContainer" onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMove}>
			{children}
		</div>
	);
};
export default DraggerContainer;
