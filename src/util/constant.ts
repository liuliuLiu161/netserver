import React from "react";

export enum Colors {
	PRIMART_COLOR = "#137cbd",
	PATH_COLOR = "#000000",
	FONT_COLOR = "#FFFFFF",
}

export enum Size {
	BIG_SIZE = "18px",
	NORMAL_SIZE = "14px",
	SMALL_SIZE = "12px",
}

export const baseIntentNumber = 10;

export const nodeBoxHeight = 30;
export const nodeBoxWidth = 90;
export const nodeBoxOffsetHeight = nodeBoxHeight / 1.5;
export const pointRadin = 5;

export const nodeOperation: Common.NodeOperation[] = ["plus", "range-map"];

export const canvasOperationStyle: React.CSSProperties = {
	borderRadius: "5px 5px 0px 0px",
	width: "60px",
	backgroundColor: "#ccc",
	height: "34px",
};

export const nodeOperationStyle: React.CSSProperties = {
	minWidth: "60px",
	padding: "0px 3px",
	backgroundColor: "#2b8bc2",
	height: "28px",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: "#fff",
	borderRadius: "5px",
	border: "1.5px #024982 solid",
	margin: "0px 2px",
	cursor: "pointer",
};
