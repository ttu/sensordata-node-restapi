export default {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './iot_db.sqlite'
        }
    },
    production: {
        client: 'mssql',
        connection: {
            database: 'iot_db'
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};