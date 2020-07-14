


import reverseNumber from './reverseNumber'
import stringMatching from './stringMatching'
import lengthOfLongestSubstring from './lengthOfLongestSubstring'
import nearestNumber from './nearestNumber'
import permute from './permute'
export {
  reverseNumber,
  stringMatching,
  lengthOfLongestSubstring,
  nearestNumber,
  permute
}
let total = [1,2,3,4].reduce((a,b)=>{
  console.log(a,b)
})
console.log(total)

console.log(2**6)

Function.prototype.bind = function(context){
  var self = this,
      arg = [].slice.call(arguments,1);
  return function(){
    return self.apply(context,arg.concat([].slice.apply(arguments)))
  }
}