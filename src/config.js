import keys from './keys';

export default {
    auth: 'http',
    loginUser: keys.loginUser,
    loginPassword: keys.loginPassword,
    db: {
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
                requestTimeout: 30000,
                options: {
                    encrypt: true // Use this if you're on Windows Azure 
                }
            },
            pool: {
                min: 2,
                max: 10
            }
        }
    }
};