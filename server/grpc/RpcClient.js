
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var searchPackageDefinition = protoLoader.loadSync();

module.exports = {
  searchPackageDefinition
}