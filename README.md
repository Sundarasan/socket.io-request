# socket.io-request

bidirectional request-response for socket.io

- https://github.com/shokai/socket.io-request
- https://npmjs.com/package/socket.io-request

[![Circle CI](https://circleci.com/gh/shokai/socket.io-request.svg?style=svg)](https://circleci.com/gh/shokai/socket.io-request)


## Install

    % npm install socket.io-request -save


## Usage

### request from Client to Server

server

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io")(3000);

io.on("connection", function(socket){ // new client
  ioreq(socket).response("toUpper", function(req, res){
    res(req.toUpperCase());
  });
});
```

client

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io-client")("http://localhost:3000");

io.on("connect", function(){
  ioreq(io).request("toUpper", "hello world")
    .then(function(res){
      console.log(res); // get "HELLO WORLD"
    })
    .catch(function(err){
      console.error(err.stack || err);
    });
});
```

### request from Server to Client

client (web browser)

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io-client")("http://localhost:3000");

io.on("connect", function(){
  ioreq(io).response("windowSize", function(req, res){
    res({
      height: window.innerHeight,
      width: window.innerWidth
    });
  });
});
```

server

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io")(3000);

io.on("connection", function(socket){ // new client

  ioreq(io).request("windowSize")
    .then(function(res){
      console.log(res); // get {height: 528, width: 924}
    })
    .catch(function(err){
      console.error(err.stack || err);
    });

});
```


### Options

```javascript
var options = {
  event: "socket.io-request", // event name on socket.io
  timeout: 90000              // request timeout (msec)
};

ioreq(io, options).request("foo");
```


## Samples

in `./sample` directory.


## Develop

    % npm i
    % npm run build
    % npm test
