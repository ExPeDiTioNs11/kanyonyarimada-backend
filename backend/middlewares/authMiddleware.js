const jwt = require('jsonwebtoken')
const _user = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const req = require('express/lib/request')
const res = require('express/lib/response')

const userControl = asyncHandler( async (req, res, next) => {

    let encryptedToken; // şifrelenmiş token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try{
            encryptedToken = req.headers.authorization.split(' ')[1];
            const token = jwt.verify(encryptedToken, process.env.JWT_SECRET);
            req.user = await _user.findById(token.id).select('-password');
            next()
        }
        catch(error) {
            res.status(400)
            throw new Error('Giriş yapılamaz')
        }
    }
   
    if(!encryptedToken)
    {
        throw new Error('Giriş yapılamaz, Token bulunamadı')
    }
    
}) 


module.exports = {
    userControl
}