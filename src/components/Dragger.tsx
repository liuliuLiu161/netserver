import React from "react";

const Dragger: React.FC<Components.ContextState["dragger"]> = (props) => {
	const { node } = props;

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

	return <div className="drag" style={dragStyle()} />;
};
export default Dragger;
