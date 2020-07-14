function format (num) {
  let reg = /\d{1,3}(?=(\d{3})+$)/g 
  return String(num).replace(reg, '$&,')
}
console.log(format(10000000))


function getUrlParam(name) {
  let reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)'),
      r = window.location.search.substr(1).match(reg);
  if (r) {
    return decodeURI(r[2])
  } else {
    return null
  }
}

Promise.resolve().then((res)=>{
  console.log(res)}).then(()=>{console.log(2)}).catch(()=>{console.log(3)})