


const express = require('express');

const app = express();
const url = "library.greenbee404.com";

const acceptedOrigin = [
  "https://greenbee404.com",
  "https://library.greenbee404.com"
];

app.all('*', (req, res, next) => {
  if (!req.socket.encrypted || req.headers.host == "greenbee404.kro.kr") {
    res.redirect("https://library.greenbee404.com" + req.originalUrl);
    return;
  }
  else {
    next();
  }
});

/* header */
app.all('*', (req, res, next) => {
  if (acceptedOrigin.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  else {
    res.header('Access-Control-Allow-Origin', null);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('X-Frame-Options', 'sameorigin');
  res.header('Server', 'Greenbee-Web-Server');
  res.header('X-Powered-By', 'Greenbee');
  next();
});

// set router
app.use('/', require('./router'));
// set static files
app.use(express.static('/root/sub/greenbee404/public'));
// set 404
app.all('*', (req, res) => {
  res.send("404 not found");
});

exports.app = app;
exports.url = url;