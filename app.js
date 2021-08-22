/**
 * greenbee 404 Library
*/

const config = require('./config.json');

const express = require('express');
const fs = require('fs');
const tls = require('tls');

/* default setting */
const app = express();
const host = config.host;
const path = config.path;
const cert = tls.createSecureContext({
  key: fs.readFileSync('/etc/letsencrypt/live/library.greenbee404.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/library.greenbee404.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/library.greenbee404.com/chain.pem'),
}).context;

const log = require('./modules/log');

/* log */
app.all('*', (req, res, next) => {
  try {
    log.req(req);
  }
  catch (error) {
    console.error(error);
  }
  next();
});

/* http redirect https */
app.all('*', (req, res, next) => {
  if (host == req.headers.host || althosts.includes(req.headers.host)) {
    if (req.secure && host == req.headers.host) {
      next();
    }
    else {
      res.redirect('https://' + host + req.originalUrl);
      return;
    }
  }
  return;
});

/* header */
app.all('*', (req, res, next) => {
  const acceptedOrigin = [
    "https://library.greenbee404.com",
    "https://greenbee.com",
  ];
  if (acceptedOrigin.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  else {
    res.header('Access-Control-Allow-Origin', 'null');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.header('X-Frame-Options', 'sameorigin');
  res.header('X-Powered-By', 'Greenbee');
  res.header('X-hacker', 'hello :)');
  res.header('Server', 'Greenbee');
  next();
});

// set basedir
app.locals.basedir = path;
// set router
app.use('/', require(path + '/router'));
// set static resource files
app.use('/resource', express.static(path + '/resource'));
// set static files
app.use(express.static(path + '/public'));
// set 404
app.all('*', (req, res) => {
  res.send("404 not found");
});

exports.app = app;
exports.host = host;
exports.cert = cert;