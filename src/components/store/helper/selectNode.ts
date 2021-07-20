import { isIncludeBox } from "./common";

const selectNode: Common.ReducerHelper<{ x: number; y: number }> = (payload, state) => {
	const { nodes } = state;

	const nodesCode = Object.keys(nodes);

	for (const iterator of nodesCode) {
		const { style } = nodes[iterator];
		if (isIncludeBox(style, payload)) {
			// TODO: Overlapping node resolve. Sort by `style.zIndex` and return `sortArray[0]`
			state.currentNode = { code: iterator, ...nodes[iterator] };
			break;
		} else {
			state.currentNode = null;
		}
	}

	return state;
};
export default selectNode;
