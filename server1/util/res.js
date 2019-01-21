var express = require('express');
express.response.success = function(data) {
  this.send({
    code: 1,
    body: data
  })
}
express.response.fail = function(msg, code = 0) {
  this.send({
    code,
    msg
  })
}