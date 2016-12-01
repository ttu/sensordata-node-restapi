# sensordata-node-restapi

Rest api for sensor data.

### Development

* unpack iot_db.7z (iot_db.sqlite) to root folder
    * src/config.js has the path to development database

```sh
$ npm install
$ npm run dev
```

Swagger UI: <http://localhost:8080/swagger/?url=http://localhost:8080/api_docs/swagger.yaml>

### Production

Production requires authentication. Supports local or http authentication. Authentication type (http/local) can be configured from src/config.js 
```sh
# Http Authentication
curl -u admin:admin 127.0.0.1:8080/api/sensors
# Local Authentication
$ curl -d "username=admin&password=admin" --dump-header headers 127.0.0.1:8080/api/login
$ curl -L -b headers 127.0.0.1:8080/api/sensors
```

* Add keys.js file to src folder with correct parameters for production database and application login credentials

```js
export default {
    host          : '127.0.0.1',
    user          : 'your_database_user',
    password      : 'your_database_password',
    database      : 'myapp_test',
    loginUser     : 'admin',
    loginPassword : 'admin'
};
```

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
## APIs

```sh
# Take specified data points for selected sensor
$ curl "localhost:8080/api/data/000D6F0003141E14?skip=0&take=2"
# Take specified data points
$ curl "localhost:8080/api/data?skip=0&take=2"
# Latest data point for each sensor
$ curl "localhost:8080/api/status"
# List of sensors
$ curl "localhost:8080/api/sensors"
# Average for specified field from last x minutes (latest data is from the beginning of 2016, so minutes must be high)
$ curl "localhost:8080/api/avg/Temperature/000D6F0003141E14?minutes=1440000"
# Room with sensor has people (100 yes, 0 no)
$ curl "localhost:8080/api/haspeople/000D6F0003141E14"
```

## Azure deployment

* Build (npm run build)
* Update host from dist/api_docs/swagger.yaml
```yaml
host: example.some.com
```

* Copy dist folder content to selected folder

```sh
# Install Azure CLI
$ npm install -g azure-cli
# Login to Azure
$ azure config mode asm
$ azure login
# Create site
$ azure site create --git {appname}
# Update files
$ git add .
$ git commit -m "first version"
$ git push azure master
```

* Turn on Web Sockets from Application Settings (go to portal.azure.com)

## Swagger

Use Online-editor to edit/validate yaml files: <http://editor.swagger.io/#/>

## Links

#### Swagger
* https://github.com/swagger-api/swagger-node
* https://github.com/shawngong/Swagger-Node-Express-For-Existing-APIs
* http://stackoverflow.com/questions/31300756/can-swagger-autogenerate-its-yaml-based-on-existing-express-routes

#### Babel
* https://github.com/babel/example-node-server
* Mocha requires babel polyfill <https://babeljs.io/docs/usage/polyfill/>
* Runtime requires <https://babeljs.io/docs/plugins/transform-runtime/>

#### Express
* https://github.com/passport/express-4.x-local-example/blob/master/server.js
* https://github.com/developit/express-es6-rest-api
* https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/

#### Passport
* https://github.com/jaredhanson/passport-local

#### Knex
* http://knexjs.org/
