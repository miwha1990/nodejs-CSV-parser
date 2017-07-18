'use strict';
const express = require('express');
const router = express.Router(),
    parseAndSave = require('../controller'),
    multer = require('multer'),
    path = require('path'),
    appDir = path.dirname(require.main.filename);

const fs = require('fs');
const csv = require('csv-parser');

const prepareResp = function(success, message, data) {
    return {
        success: !!success,
        msg: message,
        data: data
    }
};
module.exports =  function(app) {

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

    app.route('/api/upload')
        .post(function(req, res) {
            console.log("router work");
            upload(req, res, function (err) {
                if (err) {
                    res.status(400).json(prepareResp(0, 'Error!', err));
                    return
                }

                if(req.file) {
                    // parseAndSave(appDir+'/api/temp/'+req.file.filename, req.body.fileSize)
                }
            })
        });

    return router;
};