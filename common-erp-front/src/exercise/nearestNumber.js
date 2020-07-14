function nearestNumber(arr1, arr2) {
  let l = arr1.sort((a,b)=>a-b),
      r = arr2.sort((a,b)=>a-b),
      i = 0, j = 0,minDiff=2147483647;

  while(i<l.length||j<r.length) {
    let diff = Math.abs(l[i]-r[j]);
    if(diff === 0) {
      return 0
    }
    if(diff < minDiff){
      minDiff = diff
    }
    if(l[i]-l[j]>0) {
      j<r.length&&j++
    } else {
      i<l.length&&i++
    }
  }
  return minDiff
}
export default nearestNumber