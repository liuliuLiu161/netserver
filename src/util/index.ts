// export const croodinate2Pixel = (cHigth: number, cWidth: number, x: number, y: number) => {
// 	const index = x + y * cWidth;
// };

const currentNodeCoordcache = {
	x: 0,
	y: 0,
};

export const setCurrentNodeCoordCache = (x: number, y: number): typeof currentNodeCoordcache => {
	currentNodeCoordcache.x = x;
	currentNodeCoordcache.y = y;

	return currentNodeCoordcache;
};

export const getCurrentNodeCoordCache = (): typeof currentNodeCoordcache => {
	return currentNodeCoordcache;
};

export const resetCurrentNodeCoordCache = (): void => {
	currentNodeCoordcache.x = 0;
	currentNodeCoordcache.y = 0;
};
