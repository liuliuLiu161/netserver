// import React from "react";

// import { baseIntentNumber } from "util/constant";

const DataOutputGenerator: React.FC<{
	auxiliary: Common.NodeData["auxiliary"];
	dispatch: Common.Action;
}> = ({ auxiliary, dispatch }) => {
	// const renderPointCreator = (auxiliary: Common.NodeData["auxiliary"], dispatch: Common.Action) => {};
	const renderIntentMark = (markPoint: number) => {
		let resultMark = "- ";
		for (let index = 0; index < markPoint; index++) {
			resultMark += "- ";
		}
		return resultMark;
	};

	return (
		<div style={{ marginLeft: "10px", borderLeft: "1px dashed #222" }}>
			{auxiliary &&
				Object.keys(auxiliary).map((key) => {
					const keyArr = key.split(".");
					const intentCount = keyArr.length - 1;
					return (
						<div
							key={key}
							style={{
								zoom: 0.8,
							}}
						>
							{renderIntentMark(intentCount)}
							<button
								style={{
									fontSize: "12px",
									borderColor: "#ccc",
									borderRadius: "5px",
									backgroundColor: "#aaa",
									color: "#fff",
								}}
								onClick={() =>
									dispatch("createPoint", {
										type: "output",
										path: key,
									})
								}
							>
								{keyArr[intentCount]}
							</button>
						</div>
					);
				})}
		</div>
	);
};
export default DataOutputGenerator;
