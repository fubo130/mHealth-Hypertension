//import Amplify from 'aws-amplify';
const Amplify = require('aws-amplify');
const config = require('./config');
const Auth = require('@aws-amplify/auth');
// import { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

registerUser = async () => {
    const username = "yunzhe_liu@baylor.edu";
    const email = "yunzhe_liu@baylor.edu";
    const passowrd = "123456Aa!";
    try {
        const signUpResponse = await Auth.signUp({
            username,
            password,
            attributes: {
                email: email
            }
        });
        console.log(signUpResponse);
    }
    catch(error) {
        console.log(error);
    }
};

