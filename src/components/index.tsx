import React, { useEffect, useRef } from "react";
import Config from "./Config";
import Dragger from "./Dragger";
import DraggerContainer from "./DraggerContainer";
import { renderNodes } from "./drawer";
import { initialState, useDispatch } from "./store";

const Main: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [nodesIns, action] = useDispatch(initialState);
	const { nodes, currentNode, canvas: ctx } = nodesIns;

	const handleAddNode = () => {
		action("addNode", {
			style: {
				x: 20 * Math.random(),
				y: 20 * Math.random(),
				width: 100,
				height: 60,
				zIndex: Object.keys(nodes).length,
			},
		});
	};

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			action("initialCanvas", ctx);
			ctx && renderNodes(ctx, nodes);
		}
	}, []); //eslint-disable-line

	return (
		<div className="App">
			<div className="menuList">
				<div onClick={handleAddNode}>ADD</div>
			</div>
			<div className="mainContainer">
				<div className="config">
					<Config {...nodesIns} />
				</div>
				<DraggerContainer dispatch={action} nodeIns={nodesIns} canvasRef={canvasRef} ctx={ctx}>
					<canvas width={document.body.clientWidth * 0.75} height={800} ref={canvasRef} />
					<Dragger node={currentNode} />
				</DraggerContainer>
			</div>
		</div>
	);
};
export default Main;
