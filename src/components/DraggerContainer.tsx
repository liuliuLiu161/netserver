import { useState } from "react";
import { Action, useDispatch } from "./store";
// import Nodes from "./store";
import { binarySearch } from "./store/helper/common";
const DraggerContainer: React.FC<{
	canvasRef: React.RefObject<HTMLCanvasElement>;
	dispatch: Action;
	nodeIns: Components.ContextState;
	currentNode: Components.CurrentNode | null;
	ctx: CanvasRenderingContext2D | null;
	nodes: any;
}> = (props) => {
	const { canvasRef, children, nodeIns, currentNode, dispatch, ctx } = props;

	const [isMoving, setMove] = useState(false);

	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	});

	// const [tempNodes, setTempNodes] = useState(nodes);

	// const [tempNodeIns, setTempNodesIns] = useState(nodeIns);
	// console.log(tempNodeIns, nodeIns);

	// const [state, setState] = useDispatch(nodeIns);

	const handleMouseDown = (e: React.MouseEvent) => {
		// const { pageX, pageY } = e;
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}
		const rect = canvas.getBoundingClientRect();
		if (!rect) {
			return;
		}

		const { left, top } = rect;

		// dispatch("selectNode", {
		// 	x: pageX - left,
		// 	y: pageY - top,
		// });
		setCanvasOffset({
			x: left,
			y: top,
		});
		setMove(true);
	};

	const handleClick = (e: React.MouseEvent) => {
		const { nodesOffset } = nodeIns;
		// if(!currentNode) return;
		const { xArray, yArray } = nodesOffset;
		const { x, y } = canvasOffset;
		const { pageX, pageY } = e;
		// const xItem = binarySearch({ code: "", offset: pageX }, xArray);
		// const yItem = binarySearch({ code: "", offset: pageY }, yArray);

		dispatch("selectNode", {
			x: pageX - x,
			y: pageY - y,
		});
		// console.log(
		// 	xItem,
		// 	xArray.map((item) => item.offset),
		// 	xArray[xItem]
		// );
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
		const { data, style } = currentNode;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		dispatch("updateNodes", { x: pageX - x, y: pageY - y });

		// tempNodeIns
		// 	.updateNodes({ x: pageX - x, y: pageY - y })
		// 	.updateCurrentNodes({
		// 		data,
		// 		style: {
		// 			...style,
		// 			x: pageX,
		// 			y: pageY,
		// 		},
		// 	})
		// 	.renderNodes();
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		if (!currentNode) return;
		const { pageX, pageY } = e;
		const { x, y } = canvasOffset;
		const { data, style } = currentNode;
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
