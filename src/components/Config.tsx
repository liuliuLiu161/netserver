import React, { useState } from "react";
import { Action } from "./store";
import data from "../__test__/data";
import enumKey from "util/enumKey";
const FieldOperation: React.FC<{
	path: string;
	code?: string;
	dispatch: Action;
}> = (props) => {
	const { path, dispatch, code } = props;
	const pathArr = path.split(".");
	const [key, setKey] = useState<string>("");
	const [dataType, setDataType] = useState<"array" | "map" | "normal">("normal");
	const handleSameLevelClick = () => {
		dispatch("createInputPoint", {
			path: key,
			type: "input",
		});
	};
	const handleNextLevelClick = () => {
		dispatch("createInputPoint", {
			path: key,
			type: "input",
		});
	};
	const handleBlur = () => {
		dataType === "array" && setKey(key + "[]");

		if (code) {
			dispatch("updatePoint", {
				pointCode: code,
				point: {
					path: dataType === "array" ? key + "[]" : key,
					type: "input",
				},
			});
		} else {
			dispatch("createInputPoint", {
				path: key,
				type: "input",
			});
		}
	};
	return (
		<div>
			<input onBlur={handleBlur} onChange={(e) => setKey(e.target.value)} placeholder="数据字段" defaultValue={pathArr[pathArr.length - 1]} />
			<select onChange={(e) => setDataType(e.target.value as "array" | "map" | "normal")} placeholder="类型">
				<option value="normal">无</option>
				<option value="array">数组</option>
				<option value="map">对象</option>
			</select>
			<button onClick={handleNextLevelClick}>进行下钻</button>
			<button onClick={handleSameLevelClick}>增加同层</button>
		</div>
	);
};

const CreateInutPoint: React.FC<{
	points?: Common.Points;
	dispatch: Action;
}> = (props) => {
	const { points, dispatch } = props;
	// const type = "output";
	const pointsCodes = points ? Object.keys(points) : [];

	const renderField = () => {
		return pointsCodes.length ? (
			pointsCodes
				.filter((item) => points && points[item].type === "input")
				.map((item) => {
					const { path, type }: Common.Point = (points as any)[item];
					// const pathArr = path.split(".");
					return type === "input" ? <FieldOperation code={item} key={item} dispatch={dispatch} path={path} /> : null;
				})
		) : (
			<FieldOperation dispatch={dispatch} path="unknow" />
		);
	};

	return <> {renderField()}</>;
};

const Config: React.FC<
	Components.ContextState & {
		dispatch: Action;
	}
> = (props) => {
	const { currentNode, nodes, dispatch } = props;
	const generateOutputPoint = (source: Common.ResultType, dispatch: Action, sourceData: any) => {
		dispatch("createOutputPoint", {
			type: "output",
			source,
			sourceData,
		});
	};
	const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		if (e.target.value === "default") generateOutputPoint(enumKey(data), dispatch, data);
	};
	return (
		<div>
			<div>{currentNode ? currentNode.code : "未选中节点"}</div>
			{currentNode ? (
				<>
					<div>
						<select onChange={handleChange} placeholder="选择数据来源11">
							<option value="none">无</option>
							<option value="default">默认数据</option>
						</select>
					</div>
					<div>
						<CreateInutPoint dispatch={dispatch} points={nodes[currentNode.code].point} />
					</div>
					<pre>{currentNode.data.cache ? JSON.stringify(currentNode.data.cache, null, 2) : null}</pre>
				</>
			) : null}
			<div>当前节点数据</div>
		</div>
	);
};

export default Config;
