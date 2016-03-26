# sensordata-node-restapi

Rest api for sensor data.

1. unpack iot_db.7z (iot_db.sqlite) to root folder
    * src/knexConfig.js has the path to database
1. npm install
1. npm start
1. POST /login (admin/admin)
```sh
curl -d "username=admin&password=admin" --dump-header headers 127.0.0.1:1337/api/login
curl -L -b headers 127.0.0.1:1337/api/data
```

## Babel
* https://github.com/babel/example-node-server
* Mocha requires babel polyfill <https://babeljs.io/docs/usage/polyfill/>
* Runtime requires <https://babeljs.io/docs/plugins/transform-runtime/>

## Express
* https://github.com/passport/express-4.x-local-example/blob/master/server.js
* https://github.com/developit/express-es6-rest-api
* https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/

## Passport
* https://github.com/jaredhanson/passport-local

## Knex
* http://knexjs.org/

## Data

```json
[
  {
    "SensorId": "000D6F0003141E14",
    "MeasurementTime": "2015-10-29 10:23:00.0000000",
    "Temperature": 2115,
    "Pressure": 1025,
    "Humidity": 37,
    "Voc": 400,
    "Light": 69,
    "Noise": 47,
    "Battery": 80,
    "Cable": 0,
    "VocResistance": 146595,
    "Rssi": -59
  }
]
```