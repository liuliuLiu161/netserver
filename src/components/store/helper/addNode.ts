import * as uuid from "uuid";
import { insertOffsetArray } from "./common";

const addNode: Common.ReducerHelper<{ style: Common.NodeStyle }> = (payload, state) => {
	const { style } = payload;
	const code = uuid.v4();
	const node: Common.Nodes = {
		style,
		data: {
			code,
			previous: [],
			next: [],
		},
	};
	const { x, y } = style;
	insertOffsetArray({ code, offset: x }, state.nodesOffset.xArray);
	insertOffsetArray({ code, offset: y }, state.nodesOffset.yArray);
	state.nodes[code] = node;
	state.currentNode = node;
};
export default addNode;