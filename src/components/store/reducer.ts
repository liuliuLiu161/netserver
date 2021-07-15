import produce from "immer";
// import * as uuid from "uuid";
import addNode from "./helper/addNode";
import { updateCurrentNode, updateNodes } from "./helper/updateNode";
const reduce = (draft: Components.ContextState, action: ReturnType<Components.ContextAction>) => {
	const result = produce(draft, (state: any) => {
		const { payload, type } = action;

		switch (type) {
			case "ADD_NODE": {
				addNode(payload, state);
				break;
			}
			case "SELECT_NODE": {
				const { nodes } = state;

				break;
			}
			case "DELETE_NODE":
				break;
			case "UPDATE_NODE": {
				// const code = state.currentNode?.data.code;
				updateNodes(payload, state);
				updateCurrentNode(payload, state);
				break;
			}
			case "UPDATE_CURRENT_NODE": {
				break;
			}
			case "UPDATE_CANVAS_ATTR": {
				const { clickX, clickY, offsetX, offsetY } = payload;
				state.attr = {
					clickX,
					clickY,
					offsetX,
					offsetY,
				};
				break;
			}
			case "INIT_BASIC_CANVAS": {
				state.canvas = payload;
				break;
			}
			default:
				break;
		}
		// console.log(JSON.stringify(state));
	});

	return result;
};

export default reduce;
