const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = (req, res, next) => {
    //check header
    const authHeader= req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication Invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
     const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        //alternative logic
        // const user = User.findById(payload.id).select('-password');
        // req.user = user

//attach the User to the sector routes
        req.user = {
            userId: payload.userId, name: payload.name } 
            next()
    }
    catch(error){
throw new UnauthenticatedError('Authentication Invalid')
    }
}


module.exports = auth;