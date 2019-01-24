var express = require('express');

module.exports = routerDecorator(express.Router(), (req, res, next, rej) => {
  console.error(rej);
  next(Error(rej.message));
});

function ctrlDecorator(ctrl, dealer) {
  if ({}.toString.call(ctrl) !== '[object AsyncFunction]') {
    return ctrl;
  }
  return function (req, res, next) {
    return ctrl(req, res, next).catch(rej => {
      return dealer(req, res, next, rej);
    });
  };
}

function routerDecorator(router, dealer) {
  const methods = require('methods');
  [...methods, 'all'].forEach(method => {
    if (router[method]) {
      router[method] = function (path, ...fns) {
        if (fns.length === 0) return;
        const route = this.route(path);
        const ctrlIndex = fns.length - 1;
        if (typeof fns[ctrlIndex] !== 'function') throw Error('The last param should be a controller, but not a function');
        fns[ctrlIndex] = ctrlDecorator(fns[ctrlIndex], dealer);
        route[method].apply(route, fns);
        return this;
      };
    }
  });
  return router;
}