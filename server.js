const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./api/routes'),
    port = process.env.PORT || 8000;
const cluster = require('cluster');
const fs = require('fs');
const csv = require('csv-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const WebSocket = require('ws');
const configs = require('./api/db/config/conf.js');
const multer = require('multer'),
    path = require('path'),
    appDir = path.dirname(require.main.filename);

const prepareResp = function(success, message, data) {
    return {
        success: !!success,
        msg: message,
        data: data
    }
};
//uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appDir+'/api/temp')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('file');
const sequelize = new Sequelize(configs.database, configs.username, configs.password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,

    pool: {
        max: 30,
        min: 0,
        idle: 100000
    },
});
const newRow = sequelize.define('table', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    policyID: Sequelize.INTEGER,
    statecode: Sequelize.STRING,
    county: Sequelize.STRING,
    eq_site_limit: Sequelize.INTEGER,
    hu_site_limit: Sequelize.INTEGER,
    fl_site_limit: Sequelize.INTEGER,
    fr_site_limit: Sequelize.INTEGER,
    tiv_2011: Sequelize.INTEGER,
    tiv_2012: Sequelize.INTEGER,
    eq_site_deductible: Sequelize.INTEGER,
    hu_site_deductible: Sequelize.INTEGER,
    fl_site_deductible: Sequelize.INTEGER,
    fr_site_deductible: Sequelize.INTEGER,
    point_latitude: Sequelize.STRING,
    point_longitude: Sequelize.STRING,
    line: Sequelize.STRING,
    construction: Sequelize.STRING,
    point_granularity: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});
if (cluster.isMaster) {

    let indexRow = 0;
    const wss = new WebSocket.Server({port: 9999});
// Add headers
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use(cors(/*{origin: 'http://localhost:8080'}*/));

// parse application/x-www-form-urlencoded
    app.use(bodyParser.json({limit: '100Mb'}));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000
    }));

    app.use('/', express.static(__dirname + '/public'));
    // routes(app);

    app.listen(port, function () {
        console.log('API server started on: http://localhost:' + port + '/api')
    });


    const arrWorker = [];
    const rows = [];
    let rowSend = 0;

    const numCPUs = require('os').cpus().length;

    let socketsObject = null;
    wss.on('connection', function connection(ws) {
        socketsObject = ws;

    });
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        worker.on("message", function(){
            const row = rows.shift();

            if(row) {
                rowSend += JSON.stringify(row).length;
                socketsObject.send(indexRow);
                indexRow++;
                this.send(row);
            } else {
                if(socketsObject) {
                    socketsObject.send('finish');
                }
            }

        });
        arrWorker.push(worker);
    }


    app.post('/api/upload', function (req, res, next) {

        upload(req, res, function (err) {
            if (err) {
                res.status(400).json(prepareResp(0, 'Error!', err));
                return
            }

            if(req.file) {

                const readStream = fs
                    .createReadStream(appDir+'/api/temp/'+req.file.filename)
                    .pipe(csv({raw:false}))
                    .on('data', function (data) {
                        rows.push(data);
                    })
                    .on('end', function () {
                        console.log(rows.length, "end");
                    });
                // parseAndSave(appDir+'/api/temp/'+req.file.filename, req.body.fileSize)

                setTimeout(function(){
                    for (let i = 0; i < arrWorker.length; i++){
                        arrWorker[i].send(rows.shift());
                    }
                }, 1000);
            }
        });

    });



} else {
    function writeInNewFile (data){
        if (data) {
            sequelize.sync()
                .then(() => newRow.create(data))
                .then(jane => {
                    process.send({msg : "1"});
                });
        }
    }

    process.on("message", function(msg) {
        writeInNewFile(msg);
    });
}