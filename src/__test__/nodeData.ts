// import { Component } from "react";
import { Colors } from "util/constant";

export const sampleData: { [key: string]: Common.Nodes } = {
	test: {
		style: {
			height: 20,
			width: 80,
			x: 30,
			y: 30,
			color: Colors.FONT_COLOR,
		},
		data: {
			code: "test",
			previous: [],
			next: [],
		},
	},
};
