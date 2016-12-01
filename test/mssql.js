import sql from 'mssql';
import assert from 'assert';

import keys from '../src/keys.js';

const config = {
    user: keys.user,
    password: keys.password,
    server: keys.host,
    database: keys.database,
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
};

describe('MSSQL', () => {
    it('should connect with values from keys', (done) => {

        // This tests are for tesing MSSQL connections. Do not run automatically.
        if (process.env.NODE_ENV === 'test') done();

        sql.connect(config).then(function () {
            new sql.Request().query('select TOP 1 * from cubesensors_data').then(function (recordset) {
                console.dir(recordset);
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });
});
