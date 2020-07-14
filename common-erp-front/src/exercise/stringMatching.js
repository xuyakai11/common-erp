function stringMatching(arr) {
  let res = [];
  arr.sort((a,b)=>a.length-b.length)
  for(let i = 0; i < arr.length-1;i++){
    for(let j = i+1; j < arr.length; j++){
      if(arr[j].indexOf(arr[i]) !== -1) {
        res.push(arr[i])
        break
      }
    }
  }
  return res
}

export default stringMatching