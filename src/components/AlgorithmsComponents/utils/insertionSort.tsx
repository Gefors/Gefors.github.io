export const getInsertionSortAnimations = (items: number[]) => {
  const newArray = [...items];
  const animationsArray = [[1]];
  for (let i = 1; i < newArray.length; i++) {
    let j = i;
    while (j > 0 && newArray[j] < newArray[j - 1]) {
      animationsArray.push([j - 1, j]);
      const temp = newArray[j - 1];
      newArray[j - 1] = newArray[j];
      newArray[j] = temp;
      j--;
    }
  }
  return { newArray, animationsArray };
};
