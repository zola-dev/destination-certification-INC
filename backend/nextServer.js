const next = require('next');
const path = require('path');
const { parse } = require('url');
const fs = require('fs');
const privateKeyPath = 'private-key.pem';
require('dotenv').config();
if (fs.existsSync(privateKeyPath)) {
    key = fs.readFileSync(privateKeyPath);
  } else {
    key = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      },
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      }
    });
    fs.writeFileSync(privateKeyPath, key.privateKey);
  }
  const options = {
       allowHTTP1: true,
       key: fs.readFileSync('C:/Certbot/live/www.shebs-braids.area36000.com/privkey.pem'),
       cert: fs.readFileSync('C:/Certbot/live/www.shebs-braids.area36000.com/fullchain.pem')
    };

const https = require('https'); 
var port = process.env.NEXT_PORT;
var host = process.env.HOST;
const nextApp = next({ 
    dev: false, 
    dir: path.resolve(__dirname, 'api'), 
    host,
    port
});

const handle = nextApp.getRequestHandler();
nextApp.prepare().then(() => {
    //server = http2.createSecureServer(options,  async (req, res) => {
     server = https.createServer(options, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
 
      if (pathname === '/a') {
        await nextApp.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await nextApp.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`Next server is listening ${host}:${port}`);
    });
});