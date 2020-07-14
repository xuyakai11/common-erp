function lengthOfLongestSubstring (str) {
  let n = str.length
  // 滑动窗口为s[left...right]
  let left = 0
  let right = -1
  let freqMap = '' // 记录当前子串中下标对应的出现频率
  let max = 0 // 找到的满足条件子串的最长长度

  while (left < n&&right<n-1) {
    let nextLetter = str[right + 1],
      index = freqMap.indexOf(nextLetter);
    freqMap+=nextLetter
    if (index !== -1) {
      left = index+1
      freqMap = freqMap.slice(left)
    }
    right++
    console.log(freqMap)
    max = Math.max(max, freqMap.length)
  }

  return max
}
export default lengthOfLongestSubstring




function longSub(str) {
  let max = '',
      freqMap = '',
      n = str.length,
      left  = 0,
      right = -1;
  while( left < n && right < n -1) {
    let next = str[right+1],
        index = freqMap.indexOf(next);
    freqMap += next
    if(index !== -1) {
      left = index+1;
      freqMap = freqMap.slice(left)
    }
    right++
    if(max.length<freqMap.length) {
      max = freqMap
    }
  }
  return max
}
console.log(longSub('abcabcbb'))