var mysql_conf = require('../conf/conf');

var ORG_SEARCH_PROTO_PATH = __dirname + '/proto/organization_search.proto';
const CONFIG = {
  SearchServiceRpcClient: `${mysql_conf.search_service.host}:${mysql_conf.search_service.port}` // 搜索服务
}
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

// 搜索服务
var searchPackageDefinition = protoLoader.loadSync(
  ORG_SEARCH_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var search_proto = grpc.loadPackageDefinition(searchPackageDefinition).com.lieluobo.search.grpc;

// 公司搜索
function searchOrg(keyword, callback) {

  var client = new search_proto.OrganizationSearchService(CONFIG.SearchServiceRpcClient, grpc.credentials.createInsecure());
  client.search({
    page: 1,
    size: 10,
    orgType: [1, 2],
    keyword: keyword
  }, function (err, response) {
    callback(err, response)
  });

}

module.exports = {
  searchOrg
}