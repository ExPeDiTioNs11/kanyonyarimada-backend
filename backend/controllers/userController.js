const req = require("express/lib/request");
const res = require("express/lib/response");
const bcrypt = require('bcryptjs')
const asynchandler = require('express-async-handler');
const _user = require('../models/userModel')
const jwt = require('jsonwebtoken');

const create_token = (id =>{

    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

    })

    // register new user
const user_register = asynchandler(async (req, res) => {

    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) 
    {
        res.status(400)
        throw new Error('kayıt olurken boş alan bırakmayınız')
    }
    else 
    {
        const user = await _user.findOne({ email });

        if (user) 
        {
            res.status(400)
            throw new Error('Bu mail adresi zatem kullanıcı olarak kayıtlı, Kayıt olmak yerine lütfen giriş yapınız')
        }
        else 
        {
            const salt = await bcrypt.genSalt(10);
            const secretPassword = await bcrypt.hash(password, salt);

            const new_user = _user.create({
                username,
                email,
                phoneNumber,
                password: secretPassword
            })

            if(new_user)
            {
               res.status(201).json({
                    _id: (await new_user).id,
                    username: (await new_user).username,
                    email: (await new_user).email,
                    phoneNumber: (await new_user).phoneNumber,
                    token: create_token((await new_user).id)
                })
            }
            else
            { 
                res.status(400)
                throw new Error('Geçersiz kullanıcı verisi')
            }
        }
    }

})

// user login
const user_login = asynchandler(async (req, res) => {

    const {email, password} = req.body;
    const user = await _user.findOne({email});
    
    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json({
            _id: (await user).id,
            username: (await user).username,
            email: (await user).email,
            phoneNumber: (await user).phoneNumber,
            token: create_token((await user).id)
        })
    }
    else
    {
        res.status(400)
        throw Error('geçersiz e mail ve ya şifre');
    }
})

// get all user
const get_user = asynchandler(async (req, res) => {
    const user = await _user.find();
    res.status(200).json(user);
})

// get my info
const get_myInfo = asynchandler(async (req,res) => {

    const { _id, username, email, phoneNumber} = await _user.findById(req.user.id)
    res.status(200).json({
            id: _id,
            username: username,
            email: email,
            phoneNumber: phoneNumber,
    })
})

// delete selected user
const delete_selected_user = asynchandler(async (req, res) => {
    const user = await _user.findById(req.params.id);

    if(!user)
    {
        res.status(400)
        throw Error('Böyle bir kullanıcı bulunamadı, Lütfen işleminizi kontrol edin!')
    }
    else
    {
        await user.remove(); // databse den id sini seçtiğimiz kaydı siler
        res.status(200).json(user.username + ' kullanıcısı silindi!');
    }
})




module.exports =
{
    user_register,
    user_login,
    get_user,
    get_myInfo,
    delete_selected_user
}
