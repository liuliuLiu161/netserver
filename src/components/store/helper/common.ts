export const binarySearch = (item: Components.NodesOffsetSortedItem, array: Components.NodesOffsetSortedItem[]): number => {
	const { offset } = item;
	let start = 0;
	let end = array.length - 1;
	let result = 0;

	while (start < end) {
		const mid = Math.floor(start + (end - start) / 2);
		if (!array[mid]) {
			return mid;
		}
		if (array[mid].offset >= offset) {
			end = mid - 1;
		} else if (array[mid].offset < offset) {
			end = mid + 1;
			start = end;
		} else {
			result = mid;
		}
	}

	if (start === end) {
		if (offset <= array[end].offset) {
			return end - 1;
		} else {
			return start + 1;
		}
	}

	//Bounds resolve
	if (start > end) {
		if (end === -1 || !array[start]) {
			return -1;
		}
		if (start - end === 1) {
			if (offset > array[end].offset && offset < array[start].offset) {
				return end + 1;
			} else if (offset <= array[end].offset) {
				return end - 1;
			} else {
				return start + 1;
			}
		}
	}
	return result;
};

export const insertOffsetArray = (item: Components.NodesOffsetSortedItem, array: Components.NodesOffsetSortedItem[]) => {
	const itemIndex = binarySearch(item, array);

	if (itemIndex === -1) {
		array.unshift(item);

		return array;
	}

	if (array.length === 0) {
		array.splice(itemIndex, 0, item);
		return array;
	}

	array.splice(itemIndex, 0, item);
	return array;
};

// export const resortOffsetArray = (item: Components.NodesOffsetSortedItem, array: Components.NodesOffsetSortedItem[]) => {
// 	const itemIndex = binarySearch(item, array, Math.floor(array.length / 2));
//   const insertItem = array[itemIndex];
//   const oldIndex = binarySearch
//   array[itemIndex] = item;

// };
