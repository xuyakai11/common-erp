const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors')
var app = new Koa();
var router = new Router();

const koaBody = require('koa-body');
const sqlquery = require('../module/index')
const url = require('url')
const fs = require('fs')
const path = require('path')
const util = require('util')
const getUploadFileExt = require('../utils/getUploadFileExt')
const checkDirExist = require('../utils/checkDirExist');
const send = require('koa-send');

app.use(cors({
  maxAge: 5
}));
app.use(koaBody({
  multipart: true, // 支持多文件上传
  formidable: {
    uploadDir: path.resolve(__dirname,'../public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小
    // onFileBegin:(name,file) => { // 文件上传前的设置
    //   console.log(name, file)
    // }
  }
}))
//或者
// app.use(cors({
//   origin: function(ctx) { //设置允许来自指定域名请求
//     return '*'; // 允许来自所有域名请求
//       // if (ctx.url === '/test') {
//       // }
//       // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
//   },
//   maxAge: 5, //指定本次预检请求的有效期，单位为秒。
//   credentials: true, //是否允许发送Cookie
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
// }))


// app.use((ctx, next) => {
//   let pathname = url.parse(req.url).pathname;
//   console.log(JSON.stringify)
//   fs.writeFile(`${__dirname}/requestJson.json`,util.inspect(req),'utf8',function(cb){
//     console.log(cb)
//   })
//   // const writerStream = fs.createWriteStream(`${__dirname}/requestJson.txt`);
//   // writerStream.write(req, 'utf8');
//   // writerStream.end()
//   // console.log(url.parse(req.url))
//   next()
// })
router.get('/user',function(ctx, next){
  console.log('user')
  let data = {code: 200,data: {}, message: ''}
  ctx.body = data
  // ctx.body = sqlquery()
  // next()
})
router.get('/filechunk',function(ctx, next){
  let data = {code: 200,data: 0, message: ''}
  ctx.body = data
  // ctx.body = sqlquery()
  // next()
})
router.post('/file/upload',function(ctx, next){
  const file = ctx.request.files.file;
  const fileInfo = ctx.request.body
  const ext = getUploadFileExt(fileInfo.name);
  // 以文件名为目录名
  const dir = path.resolve(__dirname,`../public/upload/${fileInfo.hash}`);
  // 检查文件夹是否存在如果不存在则新建文件夹
  checkDirExist(dir);
  // 重新覆盖 file.path 属性
  file.path = `${dir}/${fileInfo.index}.${ext[1]}`;
  // console.log('file.path',file.path)
  fs.createReadStream(file.path).pipe(fs.createWriteStream(file.path));
  let data = {code: 200,data: {}, message: '文件上传成功'}
  ctx.body = data
})

router.get('/desktop/4.5.0', async function (ctx){
  // const name = ctx.params.name;
  const pathFile = '/public/upload/cypress.zip';
	ctx.attachment(pathFile);
  await send(ctx, pathFile);
})

app.use(router.routes())
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑
module.exports = app;