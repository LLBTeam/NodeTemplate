const fetch = require('node-fetch');

// 企查查公司搜索
const searchFromQcc = async keyword => {
    if (!keyword || keyword.length < 2) {
        // 搜索关键字至少2个,否则返回空结果
        return []
    }
    const json = await jsonResult('http://172.16.52.89:10080/api/v1/company/search?key=' + encodeURIComponent(keyword))
    let companyNames = []
    if (json && json.data && json.data.company_data) {
        companyNames = json.data.company_data.map(element => {
            return element.company_name.replace(/[<em><\/em>]/g, '')
        });
    }
    // get first 10 company name
    companyNames = companyNames.slice(0, 10)
    return companyNames
}

async function jsonResult(url, defaultResult) {
    try {
        const options = {
            timeout: 2000 // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
        }
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
      } catch (error) {
        console.log(`发送http json请求失败, ${url}, error: ${error}`);
        return defaultResult
      }
}

// console.log(searchFromQcc('百度'))

module.exports = {
    searchFromQcc
}