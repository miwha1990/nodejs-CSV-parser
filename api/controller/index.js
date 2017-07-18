const fs = require('fs');
const csv = require('csv-parser');
const Sequelize = require('sequelize');
const cluster = require('cluster');

/*
module.exports =  function(filePath, fileSize) {
    const arrWorker = [];
    const rows = [];
    let rowSend = 0;

    const numCPUs = require('os').cpus().length;
    const sequelize = new Sequelize('csvloader', 'root', '123123', {
        host: 'localhost',
        dialect: 'mysql',

        pool: {
            max: 30,
            min: 0,
            idle: 100000
        },
    });
    const newRow = sequelize.define('CSVTable');

    if (cluster.isMaster){


        for (let i = 0; i < numCPUs; i++) {
            const worker = cluster.fork();
            worker.on("message", function(){
                const row = rows.shift();
                if(row) {
                    try{
                        console.log(JSON.stringify(row));
                    } catch (e) {
                        console.log(e);
                    }
                    rowSend += JSON.stringify(row).length;
                }
            });
            arrWorker.push(worker);
        }


        /!*setInterval(function(){
            console.log({rowSend : rowSend, size : fileSize});
        },1000);*!/

        setTimeout(function(){
            for (let i = 0; i < arrWorker.length; i++){
                arrWorker[i].send(rows.shift());
            }
        }, 1000);

        const readStream = fs
            .createReadStream(filePath)
            .pipe(csv({raw:false}))
            .on('data', function (data) {
                rows.push(data);
            })
            .on('end', function () {
                console.log(rows.length, "end");
            });


    } else {
        function writeInNewFile (data){
            if (data) {
                 sequelize.sync()
                     .then(() => newRow.create(data))
                     .then(jane => {
                         console.log(jane.get({plain: true}));
                     });
                let time = new Date().getTime();
                fs.writeFile("./up2/" + Math.round(Math.random() * 100) + time+ "pid" + process.pid + ".txt", JSON.stringify(data), (err) => {
                    if (!err){
                        process.send({msg : "1"});
                    }
                })
            }
        }

        process.on("message", function(msg) {
            writeInNewFile(msg);
        });
    }
};*/
