module.exports = function () {
  console.log('\033[0;32m events start: \033[0;m')

  const EventEmitter = require('events');
  class MyEmitter extends EventEmitter {}

  const myEmitter = new MyEmitter();

  // myEmitter.on('event', function(a, o){
  //   console.log('触发事件', a, o, this, this === myEmitter)
  // })
  const callbackEvent = a => {
    console.log('触发事件event', a);
  }
  const callbackEvent2 = a => {
    console.log('触发事件event2', a)
  }
  const callbackEvent3 = a => {
    console.log('触发事件event3', a)
  }
  myEmitter.on('event', callbackEvent)
  myEmitter.on('event2', callbackEvent2)
  myEmitter.on('event2', callbackEvent2)
  // console.log(myEmitter.listenerCount('event2'))
  // myEmitter.removeListener('event2', callbackEvent2)
  // myEmitter.removeListener('event2', callbackEvent2)

  // const buf = new Buffer.alloc(10)
  // console.log(buf)
  // const buf1 = Buffer.alloc(10,1);
  // console.log(buf1)
  // const buf2 = Buffer.allocUnsafe(10)
  // console.log(buf2)
  // const buf3 = Buffer.from([1,2,3])
  // console.log(buf3)
  // const buf4 = Buffer.from('hello world', 'utf8')
  // console.log(buf4)
  // const buf5 = Buffer.from('hello world', 'base64')
  // console.log(buf5)
  // const arrBuf = new ArrayBuffer(32);
  // console.log(arrBuf)
  // myEmitter.emit('event', 'event');
  // myEmitter.emit('event2', 'event2');
  
  const fs = require('fs'), 
        zlib = require('zlib'),
        path = require('path'),
        dir = path.resolve(__dirname);
  // const readerStream = fs.createReadStream(`${dir}/input.txt`);
  // readerStream.setEncoding('utf8');
  // readerStream.on('data', chunk => {
  //   data += chunk
  // })
  // readerStream.on('end', () => {
  //   console.log(data)
  // })
  // readerStream.on('error', err => {
  //   console.log(err.stack)
  // })
  // const readerStrem = fs.createReadStream(`${dir}/input.txt`);
  // const writerStream = fs.createWriteStream(`${dir}/output.txt`);
  // readerStrem.pipe(writerStream)
  // data = '我是要写入output.txt文件中的文字';
  // writerStream.write(data, 'utf8');
  // writerStream.end()
  // writerStream.on('finish', ()=>{
  //   console.log('写入完成')
  // })
  // writerStream.on('error', err=>{
  //   console.log(err)
  // })

  // fs.createReadStream(`${dir}/input.txt`)
  //   .pipe(zlib.createGzip())
  //   .pipe(fs.createWriteStream(`${dir}/input.txt.gz`))
  // fs.createReadStream(`${dir}/input.txt.gz`)
  //   .pipe(zlib.createGunzip())
  //   .pipe(fs.createWriteStream(`${dir}/input.txt`))
  
  process.nextTick(()=>{
    console.log('nextTick2')
    process.nextTick(()=>{
      console.log('n4')
    })
  })
  setImmediate(()=>{
    console.log('setImmediate4')
    process.nextTick(()=>{
      console.log('nextTick3')
    })
  })
  
  console.log('\033[0;32m events end \033[0;m')
}
// 2, duilie 4 duilie n3 s3