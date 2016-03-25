export default {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './iot_db.sqlite'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            database: 'example'
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};