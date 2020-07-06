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

app.use(async (ctx, next) => {
  // 允许来自所有域名请求
  // ctx.set("Access-Control-Allow-Origin", "*");
  // 这样就能只允许 http://localhost:8080 这个域名的请求了
  ctx.set("Access-Control-Allow-Origin", "http://localhost:8082"); 

  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

  // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

  // Content-Type表示具体请求中的媒体类型信息
  ctx.set("Content-Type", "application/json;charset=utf-8");

  // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  ctx.set("Access-Control-Allow-Credentials", true);

  // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
  // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
  ctx.set("Access-Control-Max-Age", 300);

  /*
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
      Cache-Control、
      Content-Language、
      Content-Type、
      Expires、
      Last-Modified、
      Pragma。
  */
  // 需要获取其他字段时，使用Access-Control-Expose-Headers，
  // getResponseHeader('myData')可以返回我们所需的值
  //https://www.rails365.net/articles/cors-jin-jie-expose-headers-wu
  ctx.set("Access-Control-Expose-Headers", "myData");
  await next();
})
app.use(koaBody({
  multipart: true, // 支持多文件上传
  formidable: {
    uploadDir: path.resolve(__dirname,'../public/cache'), // 设置文件上传目录
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
router.get('/index',function(ctx, next){
  ctx.body = "你好"
  // ctx.body = sqlquery()
  // next()
})
router.get('/user',function(ctx, next){
  console.log('user')
  ctx.cookies.set(
    'cid', 
    'hello world 8082',
    {
      domain: 'localhost',  // 写cookie所在的域名
      path: '/',       // 写cookie所在的路径
      maxAge: 24 * 60 * 60, // cookie有效时长
      expires: new Date('2020-06-25'),  // cookie失效时间
      httpOnly: false,  // 是否只用于http请求中获取
      overwrite: false  // 是否允许重写
    }
  )
  let data = {code: 200,data: {}, message: ''}
  ctx.body = data
  // ctx.body = sqlquery()
  // next()
})
router.get('/test/cookie',function(ctx, next){
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
  const cacheDir = path.resolve(__dirname,`../public/cache/${fileInfo.hash}`);
  // 检查文件夹是否存在如果不存在则新建文件夹
  checkDirExist(dir);
  // 重新覆盖 file.path 属性
  const mkpath = `${dir}/${fileInfo.index}.${ext[1]}`;
  // console.log('file.path',file.path)
  fs.createReadStream(cacheDir).pipe(fs.createWriteStream(mkpath));
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