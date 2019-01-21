
function RpcClient(param) {

  var PROTO_PATH = __dirname + './proto/wechat_mp_marketing_service.proto';
  const CONFIG = {
    // RpcClient: '172.16.57.83:16666'  //本地
    RpcClient: 'wechat.service.prod.higgs.com:10052'  //线上
  }
  var grpc = require('grpc');
  var protoLoader = require('@grpc/proto-loader');
  var packageDefinition = protoLoader.loadSync(
      PROTO_PATH,
      {keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
      });
  var user_action_proto = grpc.loadPackageDefinition(packageDefinition).lieluobo.wechat.mp.marketing;

  function main() {
    var client = new user_action_proto.WechatMarketingService(CONFIG.RpcClient,
                                        grpc.credentials.createInsecure());
    
    client.addUserAction(param, function(err, response) {});                                   
    
  }
  main();
}
module.exports = RpcClient;