import Knex from 'knex';
import config from './knexConfig';

const knex = Knex(config.development);

function callAsync(func) {
    return new Promise(function(resolve, reject) {
        func.then(function(resp) {
            resolve(resp);
        }).catch(function(err) {
            console.log(err);
            reject(err);
        });
    });
};

class Store {
    async get() {
        return await callAsync(knex.raw('SELECT * FROM cubesensors_data LIMIT 1'));
    }
}

export default Store;