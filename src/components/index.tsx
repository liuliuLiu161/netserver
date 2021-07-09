import React, { useEffect, useRef } from "react";
import Dragger from "./Dragger";
import DraggerContainer from "./DraggerContainer";
import { Node } from "./Node";

const Main: React.FC<{
	dispatch: Components.ContextAction;
	state: Components.ContextState;
}> = (props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { dispatch, state } = props;

	const { canvas, nodes, currentNode } = state;
	const addNode = () => {
		dispatch({
			type: "ADD_NODE",
			payload: {
				style: {
					x: 20 * Math.random(),
					y: 20 * Math.random(),
					width: 100,
					height: 60,
				},
			},
		});
	};

	const renderNodes = (canvas: any, nodes: { [key: string]: Common.Nodes }) => {
		const codes = Object.keys(nodes);
		return codes.map((code) => {
			const item = nodes[code];
			return <Node key={code} canvas={canvas} node={item} code={code} />;
		});
	};

	useEffect(() => {
		if (canvasRef.current) {
			dispatch({
				type: "INIT_BASIC_CANVAS",
				payload: canvasRef.current.getContext("2d"),
			});
		}
	}, []);

	return (
		<div className="App">
			<div className="menuList">
				<div onClick={addNode}>ADD</div>
			</div>
			<DraggerContainer dispatch={dispatch} canvasRef={canvasRef}>
				<canvas width={document.body.clientWidth} height={0.9 * document.body.clientHeight} ref={canvasRef} />
				{canvas ? renderNodes(canvas, nodes) : null}
				<Dragger node={currentNode} />
			</DraggerContainer>
		</div>
	);
};
export default Main;
