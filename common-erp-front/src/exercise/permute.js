const permute = (nums) => {
  let res = [],len = nums.length
  let dfs = function(path){
    if(path.length === len) {
      res.push(path.slice())
    }

    for(let num of nums) {
      if(path.includes(num)) continue
      path.push(num)
      dfs(path)
      path.pop()
    }
  }
  dfs([])
  return res
}

console.log(permute([1,2,3,4]))
console.log('permute')
export default permute

// console.log(combineStr([1,2,3,4]));


