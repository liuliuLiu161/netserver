import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { canvasOperationStyle, nodeBoxHeight, nodeBoxWidth, nodeOperationStyle } from "util/constant";
import DataNodeConfig from "./DataNodeConfig";
import Dragger from "./Dragger";
import DraggerContainer from "./DraggerContainer";
import { renderNodes } from "./drawer";
import { useDispatch } from "./store";

const Main: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [nodesIns, action] = useDispatch();
	const { nodes, currentNode, canvas: ctx } = nodesIns;
	const [canvasRect, setCanvasRect] = useState({
		height: 0,
		width: 0,
	});
	const handleAddDataNode = () => {
		action("addNode", {
			type: "data",
			style: {
				x: 20 * Math.random(),
				y: 20 * Math.random(),
				width: nodeBoxWidth,
				height: nodeBoxHeight,
				zIndex: Object.keys(nodes).length,
			},
		});
	};

	const handleAddCalcNode = () => {
		action("addNode", {
			type: "calc",
			style: {
				x: 20 * Math.random(),
				y: 20 * Math.random(),
				width: nodeBoxWidth,
				height: nodeBoxHeight,
				zIndex: Object.keys(nodes).length,
			},
		});
	};

	useEffect(() => {
		if (canvasRef.current) {
			const ctx = canvasRef.current.getContext("2d");
			// const container = containerRef.current.getBoundingClientRect();
			action("initialCanvas", ctx);
			ctx && renderNodes(ctx, nodes);
		}
	}, []); //eslint-disable-line

	return (
		<div className="App">
			<div className="menuList">
				<div style={{ flex: 3 }}>
					<div style={canvasOperationStyle}></div>
				</div>
				<div style={{ display: "flex", flex: 1, height: "100%" }}>
					<div style={nodeOperationStyle} onClick={handleAddDataNode}>
						ADD-DATA
					</div>
					<div style={nodeOperationStyle} onClick={() => action("deleteNode", currentNode?.code)}>
						DEL
					</div>
					<div style={nodeOperationStyle} onClick={handleAddCalcNode}>
						ADD-CALC
					</div>
				</div>
			</div>
			<div className="mainContainer">
				<div className="config">
					<DataNodeConfig {...nodesIns} needDirectDataSource={currentNode?.type === "data"} dispatch={action} />
				</div>
				<DraggerContainer setCanvasRect={setCanvasRect} dispatch={action} nodeIns={nodesIns} canvasRef={canvasRef} ctx={ctx}>
					<canvas width={canvasRect.width} height={canvasRect.height} ref={canvasRef} />
					<Dragger node={currentNode} />
				</DraggerContainer>
			</div>
		</div>
	);
};
export default Main;
