import React, { useEffect, useRef, useState } from "react";
import Dragger from "./Dragger";
import DraggerContainer from "./DraggerContainer";
// import { renderNodes } from "./Node";
import Nodes from "./store";

const Main: React.FC = (props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// const nodesIns = new Nodes();
	const [nodesIns, setNodesIns] = useState(new Nodes());
	const { nodes, currentNode, canvas: ctx } = nodesIns.getNodes();
	// const { canvas: ctx, nodes, currentNode } = state;
	// console.log(nodesOffset.xArray.map((item) => item.offset));
	console.log("trigger");

	const handleAddNode = () => {
		setNodesIns(
			nodesIns
				.addNode({
					style: {
						x: 20 * Math.random(),
						y: 20 * Math.random(),
						width: 100,
						height: 60,
						zIndex: Object.keys(nodes).length,
					},
				})
				.renderNodes()
		);
	};

	// useEffect(() => {
	// 	ctx && renderNodes(ctx, nodes);
	// }, [ctx, nodes]);

	// const
	console.log("index rigger", currentNode);

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			setNodesIns(nodesIns.initialCanvas(ctx));
		}
	}, []);

	return (
		<div className="App">
			<div className="menuList">
				<div onClick={handleAddNode}>ADD</div>
			</div>
			<DraggerContainer nodes={nodes} nodeIns={nodesIns} currentNode={currentNode} canvasRef={canvasRef} ctx={ctx}>
				<canvas width={document.body.clientWidth} height={800} ref={canvasRef} />
				<Dragger node={currentNode} />
			</DraggerContainer>
		</div>
	);
};
export default Main;
