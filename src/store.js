import Knex from 'knex';
import config from './knexConfig';
import moment from 'moment';

const env = process.env.NODE_ENV || "production";

const knex = env === "production"
    ? Knex(config.production)
    : Knex(config.development);

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

    async getSensorIds() {
        const query = knex('cubesensors_data').distinct('SensorId').select();
        return await callAsync(query);
    }

    async get(sensorId, take = 1, skip = 0) {
        // const query = knex.raw('SELECT Temperature FROM cubesensors_data WHERE SensorId = ? ORDER BY MeasurementTime LIMIT ?, ?', [sensorId, skip, take]);
        const query =
            knex.select('*').from('cubesensors_data')
                .where('SensorId', sensorId)
                .orderBy('MeasurementTime', 'desc')
                .limit(take).offset(skip);

        return await callAsync(query);
    }

    async getAvg(sensorId, field, minutes = 60) {
        const query =
            knex.avg(field).from('cubesensors_data')
                .where('SensorId', sensorId)
                .andWhere('MeasurementTime', '>', moment().subtract(minutes, 'minutes').format());

        return await callAsync(query);
    }
}

export default Store;