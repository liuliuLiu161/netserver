import { useEffect, useLayoutEffect, useState } from "react";
import { drawNode, renderNodes } from "./Node";
import Nodes from "./store";

const DraggerContainer: React.FC<{
	canvasRef: React.RefObject<HTMLCanvasElement>;
	// dispatch: React.Dispatch<Components.ActionParams<any>>;
	nodeIns: Nodes;
	currentNode: Components.CurrentNode | null;
	ctx: CanvasRenderingContext2D | null;
	nodes: any;
}> = (props) => {
	const { canvasRef, children, nodeIns, currentNode, nodes, ctx } = props;

	const [isMoving, setMove] = useState(false);
	console.log(nodeIns);

	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	});

	const [tempNodes, setTempNodes] = useState(nodes);

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

	const updateSpecificNode = (style: Common.NodeStyle, data: Common.NodeData) => {
		if (!currentNode) {
			return;
		}
		const { code } = data;
		setTempNodes({
			...tempNodes,
			[code]: {
				data,
				style,
			},
		});
	};

	const handleMove = (e: React.MouseEvent) => {
		if (!isMoving) return;
		const { pageX, pageY } = e;
		// const { x, y } = canvasOffset;
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		if (!ctx) return;
		if (!currentNode) return;
		const { data, style } = currentNode;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// updateSpecificNode({ ...style, x: pageX, y: pageY }, data);
		nodeIns.updateNodes({ x: pageX, y: pageY }).updateCurrentNodes({ data, style }).renderNodes();
	};

	// useLayoutEffect(() => {
	// 	if (!ctx) return;
	// 	renderNodes(ctx, tempNodes);
	// }, [tempNodes, ctx]);

	const handleMouseUp = () => {
		setMove(false);
		if (!currentNode) return;
		const { style } = currentNode;
		const { x, y } = style;
		// dispatch({
		// 	type: "UPDATE_NODE",
		// 	payload: {
		// 		...currentNode,
		// 		style: {
		// 			...style,
		// 			x,
		// 			y,
		// 		},
		// 	},
		// });
	};

	return (
		<div className="canvasContainer" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMove}>
			{children}
		</div>
	);
};
export default DraggerContainer;
