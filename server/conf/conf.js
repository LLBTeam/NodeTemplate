module.exports = {
    mysql: {
        host: process.env.DATABASE_HOST || '172.16.52.81',
        user: process.env.DATABASE_USER || 'dev',
        password: process.env.DATABASE_PASSWORD || 'haolie123',
        database: process.env.DATABASE_NAME || 'h5_activity',
        port: process.env.DATABASE_PORT || 3306
    },
    search_service: {
        host: process.env.HL_SEARCH_RPC_HOST || '172.16.52.84',
        port: process.env.HL_SEARCH_RPC_PORT || 10254
    },
    qcc_search_service: {
        org_search_url: process.env.QCC_SEARCH_URL || 'http://172.16.52.89:10080/api/v1/company/searchs'
    }
}