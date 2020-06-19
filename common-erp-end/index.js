const app = require('./router');
const ipv4 = require('./utils/getIp')
const eventsTest = require('./utils/events')

const port = 3000;

eventsTest();

app.listen(port, () => {
  const netWork = ipv4 + ':' + port;
  console.log('App running at: \n - Local: \033[34m http://localhost:'+ port +' \033[0m \n - Network: \033[34m'+ netWork+'\033[0m')
})

