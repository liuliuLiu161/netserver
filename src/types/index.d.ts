declare namespace Common {
	interface NodeData {
		code: string;
		previous: string[];
		next: string[];
	}

	enum Colors {
		PRIMART_COLOR,
		PATH_COLOR,
		FONT_COLOR,
	}

	interface NodeStyle {
		height: number;
		width: number;
		x: number;
		y: number;
		color: string;
	}

	// type Node = NodeStyle & NodeData;
	interface Node {
		style: NodeStyle;
		data: NodeData;
	}

	interface NodeProps<S = {}> extends Partial<S> {
		code: string;
	}

	interface NodeContextState {
		style: NodeStyle;
		data: NodeData;
	}

	type PathData = NodeData[];
}

declare namespace Components {
	// interface CanvasContext {
	// 	canvas: HTMLCanvasElement | null;
	// }

	interface ContextState {
		canvas: CanvasContext["canvas"];
		overlay: Partial<{
			[code: string]: {
				canvas: CanvasContext["canvas"];
			};
			cacheData: unknown;
		}>;
		attr: {
			clickX: number;
			clickY: number;
			offsetX: number;
			offsetY: number;
		};
		nodes: {
			[code: string]: Node;
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

	type ActionType = "ADD_NODE" | "DELETE_NODE" | "UPDATE_NODE" | "UPDATE_CANVAS_ATTR" | "INIT_BASIC_CANVAS";

	interface ActionParams<P = any> {
		type: ActionType;
		payload: P;
	}

	type ContextAction = <P = any>(params: ActionParams) => ActionParams;
}