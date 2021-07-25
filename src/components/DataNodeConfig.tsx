import React, { useState } from "react";
import { nodeOperation } from "util/constant";
// import { Action } from "./store";
import data from "../__test__/data";
import DataOutputGenerator from "./DataOutputGenerator";
// import enumKey from "util/enumKey";
const FieldOperation: React.FC<{
	path: string;
	code?: string;
	dispatch: Common.Action;
	prefix: string;
	setPrefix: any;
}> = (props) => {
	const { path, dispatch, code, prefix, setPrefix } = props;
	const pathArr = path.split(".");
	const [key, setKey] = useState<string>("");
	const [dataType, setDataType] = useState<"array" | "map" | "normal">("normal");
	const getPrefix = (prefix: string) => (prefix ? prefix + "." : prefix);
	const handleSameLevelClick = () => {
		dispatch("createPoint", {
			path: getPrefix(prefix) + key,
			type: "input",
		});
	};
	const handleNextLevelClick = () => {
		dispatch("createPoint", {
			path: getPrefix(prefix) + key,
			type: "input",
		});
	};
	const handleBlur = () => {
		const newPath = getPrefix(prefix) + key;
		dataType === "array" && setKey(key + "[]");

		if (code) {
			dispatch("updatePoint", {
				pointCode: code,
				point: {
					path: dataType === "array" ? newPath + "[]" : newPath,
					type: "input",
				},
			});
		} else {
			dispatch("createPoint", {
				path: newPath,
				type: "input",
			});
		}
		setPrefix(newPath);
	};

	const handleChange = (e: React.ChangeEvent<any>) => {
		setDataType(e.target.value);
		if (code) {
			dispatch("updatePoint", {
				pointCode: code,
				point: {
					path: e.target.value === "array" ? path + "[]" : path,
					type: "input",
				},
			});
			setPrefix(e.target.value === "array" ? path + "[]" : path);
		}
	};

	return (
		<div>
			<div style={{ display: "flex", alignItems: "center" }}>
				<input onBlur={handleBlur} onChange={(e) => setKey(e.target.value)} placeholder="数据字段" defaultValue={pathArr[pathArr.length - 1]} />
				<select onChange={handleChange} defaultValue={pathArr[pathArr.length - 1].includes("[]") ? "array" : "normal"} placeholder="类型">
					<option value="normal">无</option>
					<option value="array">数组</option>
					<option value="map">对象</option>
				</select>
			</div>
			<div>
				<button onClick={handleNextLevelClick}>进行下钻</button>
				<button onClick={handleSameLevelClick}>增加同层</button>
				<button onClick={handleSameLevelClick}>删除接收点</button>
			</div>
		</div>
	);
};

const CreateInutPoint: React.FC<{
	points?: Common.Points;
	dispatch: Common.Action;
}> = (props) => {
	const { points, dispatch } = props;
	// const type = "output";
	const pointsCodes = points ? Object.keys(points) : [];
	const [prefix, setPrefix] = useState<string>("");
	const renderField = () => {
		const inputPointCode = pointsCodes.filter((item) => points && points[item].type === "input");
		return inputPointCode.length ? (
			inputPointCode.map((item) => {
				const { path, type }: Common.Point = (points as any)[item];
				// const pathArr = path.split(".");
				return type === "input" ? <FieldOperation prefix={prefix} setPrefix={setPrefix} code={item} key={item} dispatch={dispatch} path={path} /> : null;
			})
		) : (
			<FieldOperation prefix={prefix} setPrefix={setPrefix} dispatch={dispatch} path="unknow" />
		);
	};

	return <> {renderField()}</>;
};

const Config: React.FC<
	Components.ContextState & {
		dispatch: Common.Action;
		needDirectDataSource?: boolean;
	}
> = (props) => {
	const { currentNode, nodes, dispatch, needDirectDataSource } = props;
	const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		if (e.target.value === "default") {
			dispatch("updateNodeDataCache", data);
		}
	};
	return (
		<div>
			<div style={{ padding: "5px", display: "flex", alignItems: "center" }}>
				节点ID:
				<span style={{ marginLeft: "10px", zoom: 0.8, fontSize: "12px", borderRadius: "5px", border: "1px #ccc solid", color: "#fff", backgroundColor: "#aaa", padding: "2px" }}>
					{currentNode ? currentNode.code : "未选中节点"}
				</span>
			</div>
			{currentNode ? (
				<>
					{needDirectDataSource ? (
						<div style={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<label>选择数据来源:</label>
							<select style={{ flex: 1 }} onChange={handleChange} placeholder="选择数据来源">
								<option value="none">无</option>
								<option value="default">默认数据</option>
							</select>
						</div>
					) : (
						<div style={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<label>选择节点操作:</label>
							<select style={{ flex: 1 }} onChange={handleChange} placeholder="选择数据来源">
								<option key={"unknow"} value={"unknow"}>
									{"未选择"}
								</option>
								{nodeOperation.map((item) => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</select>
						</div>
					)}

					<details>
						<summary>输入节点</summary>
						<CreateInutPoint dispatch={dispatch} points={nodes[currentNode.code].point} />
					</details>
					<details>
						<summary>输出节点</summary>
						<DataOutputGenerator auxiliary={currentNode.data.auxiliary} dispatch={dispatch} />
					</details>
					<details>
						<summary>节点数据</summary>
						<pre style={{ overflow: "auto", height: "30vh" }}>
							<code>{JSON.stringify(currentNode.data.cache, null, 2)}</code>
						</pre>
					</details>
				</>
			) : null}
		</div>
	);
};

export default Config;
