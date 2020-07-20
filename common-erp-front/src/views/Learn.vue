<template>
<div class="home">
<ul>
  <li>
    <a-button type="link" @click="reverseNumber">翻转整数 {{this.reverseNumberValue}}</a-button> <span>结果：{{reverseNumberRes}}</span>
  </li>
  <li>
    <a-button type="link" @click="stringMatching"> 数组中的字符串匹配 {{this.stringMatchingValue}}</a-button> <span>结果：{{stringMatchingRes}}</span>
  </li>
  <li>
    <a-button type="link" @click="lengthOfLongestSubstring"> 无重复最长子串 {{this.lengthOfLongestSubstringValue}}</a-button> <span>结果：{{lengthOfLongestSubstringRes}}</span>
  </li>
  <li>
    <a-button type="link" @click="nearestNumber"> 无重复最长子串 {{this.nearestNumberValue}}</a-button> <span>结果：{{nearestNumberRes}}</span>
  </li>
  <li>
    <a-button type="link" @click="permute"> 全排列 {{this.permuteValue}}</a-button> <span>结果：{{permuteRes}}</span>
  </li>
</ul>
</div>
</template>
<script>
import {myMixin} from './myMixin'
console.log(myMixin)
import { reverseNumber, stringMatching, lengthOfLongestSubstring, nearestNumber,permute

} from '@/exercise/index.js'

export default {
  name: 'home',
  mixins: [myMixin],
  data() {
    return {
      reverseNumberValue: '-12345601',
      reverseNumberRes:'',
      stringMatchingValue: ["leetcoder","leetcode","od","hamlet","am"],
      stringMatchingRes: '',
      lengthOfLongestSubstringValue: 'aabaab!bb',
      lengthOfLongestSubstringRes:'',
      nearestNumberValue: [[5,1,7,4,10],[2,3,15,60]],
      nearestNumberRes: '',
      permuteValue: [1,2,3,4],
      permuteRes: '',
      prop: {
      }
    }
  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
      console.log($global)
    },
    reverseNumber() {
      this.reverseNumberRes = reverseNumber(this.reverseNumberValue)
    },
    stringMatching() {
      this.stringMatchingRes = stringMatching(this.stringMatchingValue)
    },
    lengthOfLongestSubstring(){
      this.lengthOfLongestSubstringRes = lengthOfLongestSubstring(this.lengthOfLongestSubstringValue)
    },
    nearestNumber() {
      this.nearestNumberRes = nearestNumber(this.nearestNumberValue[0], this.nearestNumberValue[1])
    },
    permute() {
      this.permuteRes = permute(this.permuteValue)
    }
  }
}
</script>
<style scoped lang="scss">
ul {
  padding-left: 15px;
  list-style: decimal;
}
  li {
    button {
      padding-left: 0;
      text-align: left;
      width: 800px;
      margin-right: 15px
    }
  }
</style>

