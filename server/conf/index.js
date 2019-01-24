const env = process.env;

module.exports = {
  mysql: {
    host: env.DATABASE_HOST || '172.16.52.81',
    user: env.DATABASE_USER || 'dev',
    password: env.DATABASE_PASSWORD || 'haolie123',
    database: env.DATABASE_NAME || 'h5_activity',
    port: env.DATABASE_PORT || 3306
  },
  search_service: {
    host: env.HL_SEARCH_RPC_HOST || '172.16.52.84',
    port: env.HL_SEARCH_RPC_PORT || 10254
  },
  port: 3000
}