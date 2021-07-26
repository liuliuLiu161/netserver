import React, { useState } from "react";
import { pointRadin } from "util/constant";

const Dragger: React.FC<Components.ContextState["dragger"]> = (props) => {
	const { node } = props;

	const [coord, setCoord] = useState<{
		x: number;
		y: number;
		type: string;
		path: string;
	} | null>(null);

	const dragStyle = (): React.CSSProperties => {
		if (node) {
			const { style } = node;
			const { x, y, height, width } = style;
			const newStyle = {
				left: x - 2.8 + "px",
				top: y - 2.8 + "px",
				height: height + 4,
				width: width + 4,
			};
			return {
				...newStyle,
				display: "block",
			};
		} else {
			return {
				display: "none",
			};
		}
	};

	const handlePointHover = (point: Common.Point) => {
		const { type, style, path } = point;
		const { x, y } = style;
		setCoord({
			x,
			y,
			type,
			path,
		});
	};

	const renderPoints = () => {
		if (!node) {
			return;
		}
		const { point: points, style } = node;
		// const { style } = node;
		const { x, y } = style;
		if (!points) {
			return;
		}

		const pointKeys = Object.keys(points);
		return pointKeys.map((key) => {
			const point = points[key];
			const { x: px, y: py } = point.style;
			console.log(px, x);
			return (
				<div
					key={key}
					onMouseEnter={() => handlePointHover(point)}
					onMouseLeave={() => setCoord(null)}
					style={{ cursor: "pointer", top: py - y - pointRadin, left: px - x - pointRadin, height: `${pointRadin * 2}px`, position: "absolute", width: `${pointRadin * 2}px` }}
				></div>
			);
		});
	};

	const renderPathTips = () => {
		if (!coord) {
			return null;
		}
		if (!node) {
			return;
		}
		const { style } = node;
		// const { style } = node;
		const { x, y } = style;
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		const { path, type, x: px, y: py } = coord;
		if (!context) {
			return null;
		}
		const pathPixel = context.measureText(path);
		context.font = "12px";
		return <div style={{ fontSize: "12px", left: type === "input" ? x - (px + pathPixel.width + 15) : px + 15 - x, top: py - y - pointRadin, position: "absolute" }}>{path}</div>;
	};

	return (
		<div className="drag" style={dragStyle()}>
			{renderPoints()}
			{renderPathTips()}
		</div>
	);
};
export default Dragger;
