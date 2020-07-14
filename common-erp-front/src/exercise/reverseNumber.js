function reverseNumber(x){
  if(!x){return 0} // 0的情况
  let res = 0, p = Math.abs(x), s = p/x;
  while(p) {
      let tem = p % 10;
      p = ~~(p/10)
      res = res*10+tem
  }
  res = res*s;
  if(res > Math.pow(2, 31)-1 || res < -Math.pow(2,31)) { // 超出范围输出0
    res = 0
  }
  return res
}

export default reverseNumber