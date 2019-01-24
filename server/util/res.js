var express = require('express');
express.response.success = function(data, meta = {}) {
  this.send({
    code: 1,
    body: data,
    meta
  })
}
express.response.fail = function(msg, code = 0) {
  this.send({
    code,
    msg
  })
}