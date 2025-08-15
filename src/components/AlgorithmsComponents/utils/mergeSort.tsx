const merge = (
  items: number[],
  aux: number[],
  animationsArray: number[][],
  lo: number,
  mid: number,
  hi: number
) => {
  for (let k = lo; k <= hi; k++) {
    aux[k] = items[k];
  }

  let i = lo,
    j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      animationsArray.push([aux[j], k]);
      items[k] = aux[j++];
    } else if (j > hi) {
      animationsArray.push([aux[i], k]);
      items[k] = aux[i++];
    } else if (aux[i] <= aux[j]) {
      animationsArray.push([aux[i], k]);
      items[k] = aux[i++];
    } else {
      animationsArray.push([aux[j], k]);
      items[k] = aux[j++];
    }
  }
};

export const getMergeSortAnimations = (
  items: number[],
  aux: number[],
  animationsArray: number[][],
  lo: number,
  hi: number
) => {
  if (lo >= hi) return;

  const mid = lo + Math.floor((hi - lo) / 2);

  getMergeSortAnimations(items, aux, animationsArray, lo, mid);
  getMergeSortAnimations(items, aux, animationsArray, mid + 1, hi);
  merge(items, aux, animationsArray, lo, mid, hi);
};
