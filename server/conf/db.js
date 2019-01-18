module.exports = {
    mysql: {
        host: process.env.DATABASE_HOST || '172.16.52.81',
        user: process.env.DATABASE_USER || 'dev',
        password: process.env.DATABASE_PASSWORD || 'haolie123',
        database: process.env.DATABASE_NAME || 'h5_activity',
        port: process.env.DATABASE_PORT || 3306
    }
}