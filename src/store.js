import Knex from 'knex';
import moment from 'moment';

import config from './config';

const env = process.env.NODE_ENV || "production";

const knex = env === "production"
    ? Knex(config.db.production)
    : Knex(config.db.development);

function callAsync(func) {
    return new Promise(function(resolve, reject) {
        func.then(function(resp) {
            resolve(resp);
        }).catch(function(err) {
            reject(err);
        });
    });
};

class Store {
    async getCount() {
        const count = await callAsync(knex('cubesensors_data').count());
        return count[0]['count(*)'];
    }

    async getAllData(take = 1, skip = 0) {
        const query =
            knex.select('*').from('cubesensors_data')
                .orderBy('MeasurementTime', 'desc')
                .limit(take).offset(skip);

        return await callAsync(query);
    }

    async getSensorIds() {
        const query = knex('cubesensors_data').distinct('SensorId').select();
        const data = await callAsync(query);
        return data.map(s => s.SensorId);
    }

    async getSensorStatuses() {
        const idQuery = await callAsync(knex('cubesensors_data').distinct('SensorId').select());

        // Maybe there is a better way to do this on db with one query..
        const promises = idQuery.map(i => {
            const query = knex.select('*').from('cubesensors_data')
                .where('SensorId', i.SensorId)
                .orderBy('MeasurementTime', 'desc')
                .limit(1).offset(0);
            return callAsync(query);
        });

        const values = await Promise.all(promises);
        return values.reduce((prev, curr) => prev.concat(curr));
    }

    async getSensorData(sensorId, take = 1, skip = 0) {
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