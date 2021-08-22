npm/**
 * server.js
 * 
 * (c) 2017-2021 Wany
 * 
 * @summary Wanyne Server
 * @author Wany <sung@wany.io>
*/

const express = require('express');
const vhost = require('vhost');

const https = require('https');
const http = require('http');
const spdy = require('spdy');

const {exec} = require('child_process');

const fs = require('fs');
const tls = require('tls');

const app = express();

const cert = new Object();
let acceptedHosts = new Array();
const port = { https: 443, http: 80 };

app.all('*', (req, res, next) => {
  if (!acceptedHosts.includes(req.headers.host)) {
    return;
  }
  next();
});



/* Wanyne (wany.io) */
let wanyne;
try {

  wanyne = require("/root/io.wany/app");

  app.use(vhost(wanyne.host, wanyne.app));
  cert[wanyne.host] = wanyne.cert;
  acceptedHosts.push(wanyne.host);

  app.use(vhost("www." + wanyne.host, wanyne.app));
  acceptedHosts.push("www." + wanyne.host);

  app.use(vhost("wnynya.com", wanyne.app));
  cert["wnynya.com"] = tls.createSecureContext({
    key: fs.readFileSync('/etc/letsencrypt/live/wnynya.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/wnynya.com/cert.pem')
  }).context;
  acceptedHosts.push("wnynya.com");

  app.use(vhost("sungwan.io", wanyne.app));
  acceptedHosts.push("sungwan.io");

  app.use(vhost("wanyne.xyz", wanyne.app));
  acceptedHosts.push("wanyne.xyz");

} catch (error) {
  console.error(error);
}



/* SSL certificates */
const SNICallback = (url, callback) => {
  try {

    if (cert[url]) {
      callback(null, cert[url]);
    }
    else {
      callback("", null);
    }

  } catch (error) {
    console.error(error);
  }
}

const option = {
  SNICallback: SNICallback
};

/* HTTPS */
//const httpsServer = https.createServer(option, app);
const httpsServer = spdy.createServer(option, app);
/* WebSocket upgrade */
httpsServer.on('upgrade', (request, socket, head) => {

  try {

    var dest = request.headers.host;

    switch (dest) {

      default: {
        socket.destroy();
      }

    }
  }
  catch (error) {
    console.error(error);
  }

});

/* HTTP */
const http = require('http');
const httpServer = http.createServer(app);
/* WebSocket upgrade */
httpServer.on('upgrade', (request, socket, head) => {

  try {

    var dest = request.headers.host;

    switch (dest) {

      default: {
        socket.destroy();
      }

    }

  }
  catch (error) {
    console.error(error);
  }

});

/* add listener */
exec("kill -9 $(lsof -t -i:" + port.https + ")", (error, stdout, stderr) => {

  setTimeout(() => {
    console.log("server start");
    try {
      httpsServer.listen(port.https, () => { });
      httpServer.listen(port.http, () => { });
    } catch (error) {
      console.log(error);
    }
  }, 500);

});