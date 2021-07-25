declare namespace Common {
	interface ResultType {
		[key: string]: string | number | string[] | number[];
	}

	interface NodeData {
		//Previous nodes

		//Node cache Data
		cache?: any;

		//Node Auxiliary structure
		auxiliary?: ResultType;
	}

	interface NodeStyle {
		height: number;
		width: number;
		x: number;
		y: number;
		zIndex: number;
		color?: string;
	}

	type NodeType = "data" | "calc";

	type NodeOperation = "range-map" | "plus" | "unknow";

	// interface NodeOperationAuxiliary {
	//   plus:{
	//     type: ''
	//   }
	// }
	interface PlusOperationAuxiliary {
		name: "plus";
		type: "string" | "math";
		value: string | number;
	}

	interface RangeOperationAuxiliary {
		name: "range-map";
		range: number[];
	}

	type OperationAuxiliary = RangeOperationAuxiliary | PlusOperationAuxiliary;

	// type Node = NodeStyle & NodeData;
	interface Nodes {
		style: NodeStyle;
		data: NodeData;
		previous?: Previous[];
		type: NodeType;
		operation?: NodeOperation;
		operationAuxiliary?: any;
		//Next nodes points
		next?: {
			code: string;
			index: number;
		}[];

		//Connection points
		point?: Points;
	}

	interface NodesMap {
		[code: string]: Nodes;
	}

	interface Point {
		path: string;
		style: PointStyle;
		type: "input" | "output";
	}
	interface Points {
		[code: string]: Point;
	}

	interface Previous {
		code: string;
		//Previous nodes points
		pointCode: string;
		currentPointCode: string;
		style: LineStyle;
	}
	//Effective fucntion of reducer cases
	interface ReducerHelper<T> {
		(payload: T, state: Components.ContextState): Components.ContextState;
	}

	interface Actions {
		addNode: ReducerHelper<{
			style: NodeStyle;
			type: NodeType;
		}>;
		updateNodes: ReducerHelper<{
			x: number;
			y: number;
		}>;
		renderNode(state: Components.ContextState): void;
		initialCanvas: ReducerHelper<Components.ContextState["canvas"]>;
		selectNode: ReducerHelper<{ x: number; y: number }>;
		updateNodePrevious: ReducerHelper<{
			nodeCode: string;
			pointCode: string;
			currentPointCode: string;
		}>;
		// createOutputPoint:ReducerHelper<{ source:ResultType; type: "input" | "output"; sourceData: any }>;
		// createInputPoint:ReducerHelper<{ path: string; type: "input" | "output" }>;
		createPoint: ReducerHelper<{ path: string; type: "input" | "output" }>;
		deleteNode: ReducerHelper<string>;
		updatePoint: ReducerHelper<{
			pointCode: string;
			point: Partial<Common.Point>;
		}>;
		updateNodeDataCache: ReducerHelper<any>;
	}

	type Action = (type: keyof Actions, payload?: any) => void;

	enum Colors {
		PRIMART_COLOR,
		PATH_COLOR,
		FONT_COLOR,
		2,
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

	interface LineStyle {
		color: string;
		radin?: number;
	}

	interface LineProps extends LineStyle {
		start: number[];
		end: number[];
		canvas: Components.CanvasContext["canvas"];
	}

	interface PointStyle {
		// circle center x
		x: number;
		// circle center y
		y: number;
		// default 15
		r?: number;
		color: string;
	}

	interface PointProps extends PointStyle {
		canvas: Components.CanvasContext["canvas"];
	}

	type PathData = NodeData[];
}

declare namespace Components {
	interface CanvasContext {
		canvas: CanvasRenderingContext2D;
	}

	interface CurrentNode extends Common.Nodes {
		code: string;
		xIndex?: number;
		yIndex?: number;
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
		nodes: Common.NodesMap;
		//Fast find match node
		nodesOffset?: {
			xArray: NodesOffsetSortedItem[];
		};
		dragger: {
			node: Common.Nodes | null;
		};
	}

	type ConnectComponent = <P = {}>(C: React.FC<P>) => React.FC<P>;

	type Connect = <P = {}>(
		dependence: (state: ContextState) => {
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
