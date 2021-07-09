export const binarySearch = (item: Components.NodesOffsetSortedItem, array: Components.NodesOffsetSortedItem[], flag: number): number => {
	const { offset } = item;
	if (array.length === 1) {
		return flag + (offset > array[0].offset ? 1 : -1);
	}
	if (array.length === 0) {
		return 0;
	}
	if (array[flag].offset >= offset) {
		return binarySearch(item, array.slice(flag + 1, array.length + 1), Math.floor(array.length / 2));
	} else {
		return binarySearch(item, array.slice(0, flag - 1), Math.floor(array.length / 2));
	}
};

export const insertOffsetArray = (item: Components.NodesOffsetSortedItem, array: Components.NodesOffsetSortedItem[]) => {
	const itemIndex = binarySearch(item, array, Math.floor(array.length / 2));
	if (array.length === 0) {
		return array.splice(itemIndex, 0, item);
	}

	if (array[itemIndex].code === item.code) {
		return;
	}
	array.splice(itemIndex, 0, item);
};

// export const resortOffsetArray = (item: Components.NodesOffsetSortedItem, array: Components.NodesOffsetSortedItem[]) => {
// 	const itemIndex = binarySearch(item, array, Math.floor(array.length / 2));
//   const insertItem = array[itemIndex];
//   const oldIndex = binarySearch
//   array[itemIndex] = item;

// };
