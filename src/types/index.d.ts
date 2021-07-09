declare namespace Common {
	interface NodeData {
		code: string;
		previous: string[];
		next: string[];
	}

	//Effective fucntion of reducer cases
	interface ReducerHelper<T> {
		(payload: T, state: Components.ContextState): void;
	}

	enum Colors {
		PRIMART_COLOR,
		PATH_COLOR,
		FONT_COLOR,
		2,
	}

	interface NodeStyle {
		height: number;
		width: number;
		x: number;
		y: number;
		zIndex: number;
		color?: string;
	}

	// type Node = NodeStyle & NodeData;
	interface Nodes {
		style: NodeStyle;
		data: NodeData;
	}

	interface NodeProps<S> {
		code: string;
		node: S;
		canvas: Components.CanvasContext["canvas"];
	}

	interface NodeContextState {
		style: NodeStyle;
		data: NodeData;
	}

	interface LineProps {
		start: number[];
		end: number[];
		color: string;
		canvas: Components.CanvasContext["canvas"];
		radin?: number;
	}

	type PathData = NodeData[];
}

declare namespace Components {
	interface CanvasContext {
		canvas: CanvasRenderingContext2D;
	}

	interface CurrentNode extends Common.Nodes {
		xIndex: number;
		yIndex: number;
	}

	interface NodesOffsetSortedItem {
		code: string;
		offset: number;
	}
	interface ContextState {
		canvas: CanvasContext["canvas"] | null;
		overlay: Partial<{
			[code: string]: {
				canvas: CanvasContext["canvas"] | null;
			};
			cacheData: unknown;
		}>;
		currentNode: CurrentNode | null;
		attr: {
			clickX: number;
			clickY: number;
			offsetX: number;
			offsetY: number;
		};
		nodes: {
			[code: string]: Nodes;
		};
		//Fast find match node
		nodesOffset: {
			xArray: NodesOffsetSortedItem[];
			yArray: NodesOffsetSortedItem[];
		};
		dragger: {
			node: Common.Nodes | null;
		};
	}

	type ConnectComponent = <P = {}>(C: React.FC<P>) => React.FC<P>;

	type Connect = <P = {}>(
		dependence: (
			state: ContextState
		) => {
			[key: string]: any;
		}
	) => ConnectComponent<P>;

	type ActionType = "ADD_NODE" | "DELETE_NODE" | "UPDATE_NODE" | "UPDATE_CANVAS_ATTR" | "INIT_BASIC_CANVAS" | "SELECT_NODE" | "UPDATE_CURRENT_NODE";

	interface ActionParams<P = any> {
		type: ActionType;
		payload: P;
	}

	type ContextAction = <P = any>(params: ActionParams) => ActionParams;

	interface DraggerAttr {
		x: number;
		y: number;
		height: number;
		width: number;
	}
}
