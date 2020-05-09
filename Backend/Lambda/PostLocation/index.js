'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-east-1"});

exports.handler = async (event) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});

    const params = {
        TableName: "Location",
        Key: {
            id: {
                S: "12345"
            }
        }
    }

    ddb.getItem(params, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
    });

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

