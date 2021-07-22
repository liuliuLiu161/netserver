// import { Component } from "react";
import { Colors } from "util/constant";

export const sampleData: { [key: string]: Common.Nodes } = {
	test: {
		style: {
			height: 60,
			width: 100,
			x: 30,
			y: 30,
			zIndex: 0,
			color: Colors.FONT_COLOR,
		},
		data: {},
		previous: [],
		next: [],
		point: {
			"test-point": {
				path: "a.b.c",
				style: {
					x: 30,
					y: 40.5,
					color: "#000",
				},
				type: "output",
			},
		},
	},
	test2: {
		style: {
			height: 60,
			width: 100,
			x: 130,
			y: 130,
			zIndex: 0,
			color: Colors.FONT_COLOR,
		},
		data: {},
		previous: [
			{
				code: "test",
				currentPointCode: "test-point",
				pointCode: "test-point",
				style: {
					color: "#000",
				},
			},
		],
		next: [],
		point: {
			"test-point": {
				path: "a.b.c",
				style: {
					x: 210,
					y: 140.5,
					color: "#00f",
				},
				type: "input",
			},
		},
	},
	test3: {
		style: {
			height: 60,
			width: 100,
			x: 230,
			y: 230,
			zIndex: 0,
			color: Colors.FONT_COLOR,
		},
		data: {},
		previous: [],
		next: [],
		point: {
			"test-point": {
				path: "a.b.c",
				style: {
					x: 310,
					y: 240.5,
					color: "#ff0",
				},
				type: "input",
			},
		},
	},
};
