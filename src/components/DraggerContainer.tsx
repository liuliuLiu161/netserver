import { useState } from "react";
import Nodes from "./store";
import { binarySearch } from "./store/helper/common";
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

	const [canvasOffset, setCanvasOffset] = useState({
		x: 0,
		y: 0,
	});

	// const [tempNodes, setTempNodes] = useState(nodes);

	const [tempNodeIns, setTempNodesIns] = useState(nodeIns);
	console.log(tempNodeIns, nodeIns);

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

	const handleClick = (e: React.MouseEvent) => {
		const { nodesOffset } = nodeIns;
		// if(!currentNode) return;
		const { xArray, yArray } = nodesOffset;
		const { pageX, pageY } = e;
		const xItem = binarySearch({ code: "", offset: pageX }, xArray);
		const yItem = binarySearch({ code: "", offset: pageY }, yArray);
		console.log(
			xItem,
			xArray.map((item) => item.offset),
			xArray[xItem]
		);
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

		tempNodeIns
			.updateNodes({ x: pageX - x, y: pageY - y })
			.updateCurrentNodes({
				data,
				style: {
					...style,
					x: pageX,
					y: pageY,
				},
			})
			.renderNodes();
	};

	const handleMouseUp = () => {
		setMove(false);
	};

	return (
		<div className="canvasContainer" onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMove}>
			{children}
		</div>
	);
};
export default DraggerContainer;
