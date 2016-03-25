# sensordata-node-restapi

Rest api for sensor data.

1. unpack iot_db.7z (iot_db.sqlite) to root folder
    * src/knexConfig.js has the path to database
1. npm install
1. npm start
1. POST /login (admin/admin)
```sh
curl -d "username=admin&password=admin" --dump-header headers 127.0.0.1:1337/login
curl -L -b headers 127.0.0.1:1337/data
```

## Babel
* https://github.com/babel/example-node-server
* Mocha requires babel polyfill <https://babeljs.io/docs/usage/polyfill/>
* Runtime requires <https://babeljs.io/docs/plugins/transform-runtime/>

## Express
* https://github.com/passport/express-4.x-local-example/blob/master/server.js
* https://github.com/developit/express-es6-rest-api

## Passport
* https://github.com/jaredhanson/passport-local

## Knex

* Dev
    * npm install sqlite3 --savedev