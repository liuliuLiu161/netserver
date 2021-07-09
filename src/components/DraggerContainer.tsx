import { useState } from "react";

const DraggerContainer: React.FC<{
	canvasRef: React.RefObject<HTMLCanvasElement>;
	dispatch: React.Dispatch<Components.ActionParams<any>>;
	currentNode: Components.CurrentNode | null;
}> = (props) => {
	const { canvasRef, children, dispatch, currentNode } = props;

	const [isMoving, setMove] = useState(false);

	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	});

	const handleMouseDown = (e: React.MouseEvent) => {
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

	const handleClick = () => {};

	const handleMove = (e: React.MouseEvent) => {
		const { pageX, pageY } = e;
		const { x, y } = canvasOffset;
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const ctx = canvas.getContext("2d");

		if (!isMoving) return;
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		dispatch({
			type: "UPDATE_NODE",
			payload: {
				x: pageX - x,
				y: pageY - y,
			},
		});
	};

	const handleMouseUp = () => {
		setMove(false);
		if (!currentNode) return;
		const { style } = currentNode;
		const { x, y } = style;
		dispatch({
			type: "UPDATE_CURRENT_NODE",
			payload: {
				...currentNode,
				style: {
					...style,
					x,
					y,
				},
			},
		});
	};

	return (
		<div className="canvasContainer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMove}>
			{children}
		</div>
	);
};
export default DraggerContainer;
