import React from "react";

const FieldOperation: React.FC<{
	type: "output" | "input";
	path: string;
}> = () => {};

const CreateInutPoint: React.FC<{
	points?: Common.Points;
}> = (props) => {
	const { points } = props;
	const type = "output";
	const pointsCodes = points ? Object.keys(points) : [];

	const handleSameLevelClick = () => {};

	const renderField = () => {
		return pointsCodes.length ? (
			pointsCodes.map((item) => {
				const { path, type }: Common.Point = (points as any)[item];
				const pathArr = path.split(".");
				return type === "output" ? (
					<div key={item}>
						<input placeholder="数据字段" defaultValue={pathArr[pathArr.length - 1]} />
						<select placeholder="类型">
							<option>数组</option>
							<option>对象</option>
						</select>
						<button>进行下钻</button>
						<button>增加同层</button>
					</div>
				) : null;
			})
		) : (
			<div key="unknow">
				<input placeholder="数据字段" />
				<select placeholder="类型">
					<option>数组</option>
					<option>对象</option>
				</select>
				<button>进行下钻</button>
				<button>增加同层</button>
			</div>
		);
	};

	return <> {renderField()}</>;
};

const Config: React.FC<Components.ContextState> = (props) => {
	const { currentNode, nodes } = props;
	return (
		<div>
			<div>{currentNode ? currentNode.code : "未选中节点"}</div>
			{currentNode ? (
				<>
					<div>
						<select placeholder="选择数据来源11">
							<option>选择数据来源</option>
						</select>
					</div>
					<div>
						<CreateInutPoint points={nodes[currentNode.code].point} />
					</div>
				</>
			) : null}
		</div>
	);
};

export default Config;
