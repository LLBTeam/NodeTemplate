var express = require('express');
var router = express.Router();
var rpcClient = require('../grpc/RpcClient')
var searchOrgService = require('../service/SearchOrgService');

// 猜灯谜活动
// 搜索公司
router.get('/searchOrg', (req, res, next) => {
  // 先调用公司搜索服务查询系统内的公司,如果没有结果再从企查查搜索
  console.log(req.query)
  const keyword = req.query.keyword
  rpcClient.searchOrg(keyword, async (err, response) => {
    if (response && response.orgs) {
      let orgNames = response.orgs.map(element => element.name)
      if (orgNames && orgNames.length > 0) {
        // 说明系统中有搜索结果
        console.log(`返回系统公司搜索 ${keyword} 结果`)
        return res.success(orgNames)
      }
    }
    // 说明系统没有搜索结果,调用企查查搜索
    const qccSearchResult = await searchOrgService.searchFromQcc('百度')
    console.log(`返回企查查公司搜索 ${keyword} 结果`)
    return res.success(qccSearchResult)
  })
});

module.exports = router;
