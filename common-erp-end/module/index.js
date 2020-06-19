const models = require('./db');
const mysql = require('mysql');

const conn = mysql.createConnection(models.mysql);

conn.connect((err)=>{
  if(err) {
    console.log('链接数据库失败')
  } else {
    console.log('链接mysql成功')
  }
});

function queryPromise($sql) {
  return new Promise((resolve, reject) => {
    conn.query($sql, (err, r)=>{
      if (err) {
        reject('error')
      } else {
        resolve(r)
      }
    })
  })
}
async function queryPromises(queryArr) {
  return new Promise((resolve, reject)=>{
    Promise.all(queryArr.map(v => queryPromise(v))).then(r => {
      resolve(r)
    }).catch(err => {
      reject(err)
    })
  })
}
function toJsonData(options) {
  let data = {code: 200, data: {}, message: 'success'}
  Object.assign(data.data, options)
  return data
}
function failResponse(options) {
  let data = {code: 500, message: 'fail'}
  Object.assign(data, options)
  return data
}
module.exports = async function(app, url) {
  return await new Promise((resolve, reject)=>{
    let list = []
    queryPromises(['NULL','not NULL'].map(v => 'select * from test where parent_id is '+v)).then(r => {
      list = r[0].map(v => {
        v.child = []
        r[1].forEach(k => {
          if(k.parent_id === v.id) {
            v.child.push(k)
          }
        })
        return v
      })
      resolve(toJsonData({list}))
    }).catch(err => {
      reject(failResponse({message: err}))
    })
  })
    
}