const express = require('express');
const helmet = require('helmet');
const app = express();















































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
// Ask Helmet to ignore the X-Powered-By header.
app.use(helmet.hidePoweredBy());
// Mitigate clickjacking 
app.use(helmet.frameguard({action: 'deny'}))
// sanitize input sent to the server
app.use(helmet.xssFilter())
// Hide Content-Type header
app.use(helmet.noSniff())
// prevents users to execute downloads in the site's context
app.use(helmet.ieNoOpen())
// config to use https for 90 days
app.use(helmet.hsts({maxAge: 90*24*60*60, force: true}))
// improve user privacy 
app.use(helmet.dnsPrefetchControl());
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
