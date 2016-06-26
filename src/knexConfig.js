import keys from './keys';

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
            host: keys.host,
            database: keys.database,
            user: keys.user,
            password: keys.password,
            options: {
                encrypt: true // Use this if you're on Windows Azure 
            }
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};