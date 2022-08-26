const {expressjwt: jwt} = require('express-jwt');

function getTokenFromHeader (req) {

    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
        
        // example authorization header:
        // {authorization: "Bearer 3o3k2m4rklmdafladasklfm325"}
        const token = req.headers.authorization.split(' ')[1];
        return token;

    }

    return null;
}

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: getTokenFromHeader, 

})

module.exports = {
    isAuthenticated
}