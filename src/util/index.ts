export const croodinate2Pixel = (cHigth: number, cWidth: number, x: number, y: number) => {
	const index = x + y * cWidth;
};

export const anaylzePath = (path: string) => {
	const pathArray = path.split(".").reverse();
	const arrayReg = /\[\]/;
	let arrayCount = 0;
	//TODO: Revers target path and get real target valve address
	pathArray.forEach((item) => {
		const isArray = arrayReg.test(item);
		if (isArray) {
			arrayCount++;
		}
		if (arrayCount > 1 && isArray) {
			//Default set previous array 0 index
			item = item.replace("[]", "[0]");
		}
	});
	const tempArr = pathArray.reverse().join(".");
	return (index = NaN) => {
		if (isNaN(index)) {
			return tempArr;
		} else {
			return tempArr.replace("[]", `[${index}]`);
		}
	};
};
