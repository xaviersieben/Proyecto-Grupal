const userServices = require('../Services/userService.js');
const { User } = require('../db.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const getAllUsers = async (_req, res, next) => {
    try{
        const users = await User.findAll();
        if(users.length){
            res.status(200).json(users);
        }else{
            res.status(400).json({ msg: "Error, no users found"});
        }
    }catch(error){
        next(error)
    }
}

const createNewUser = async (req, res, next) => {
    const { body } = req;
    const salt = await bcrypt.genSalt(10);
    try{
        const myUser = {
            name: body.name,
            surname: body.surname,
            password: await bcrypt.hash(body.password, salt),
            email: body.email,
            adress: body.adress,
        };
        const [_user, created] = await User.findOrCreate({
            where: { email: myUser.email}, 
            defaults:{
                ...myUser,
            }
        });
        if(created === true){
            res.status(200).json({ msg : 'User stored correctly' });
        }else{
            res.status(400).json({ msg: "Error, the User already exist"});
        }
    }catch(error){
        next(error);
    }
}

const swapStatus = async (req, res, next) =>{
    try{
        const user0 = await User.findOne({ where : {email : req.body.email }});
        if(user0){
            const updated = await User.update(
                {active: !user0.active},
                {where: {email: req.body.email}}
            );
            if(updated[0]===1){
                userStatus = !user0.active;
                res.status(200).json({msg: `User is active: ${userStatus}`})
            }
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }        
    }catch(error){
        next(error)
    }
}

const swapType = async(req, res, next) =>{
    try{
        const user = await User.findOne({ where : {id : req.params.id }});
        if(user){
            const updated = await User.update(
                {isAdmin: !user.isAdmin},
                {where: {id: req.params.id}}
            );
            if(updated[0]===1){
                userStatus = !user.isAdmin;
                res.status(200).json({msg: `User is admin: ${userStatus}`})
            }
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }  
    }catch(error){
        next(error);
    }
}

const userLogin = async(req, res, next) =>{
    try{
        const user = await User.findOne({ where : {email : req.body.email }});
        if(user){
            const validatePassword = await bcrypt.compare(req.body.password,user.password);
            if(validatePassword){
                let payload = { "id": user.id, "email": user.email, "isAdmin": user.isAdmin};
                let token = jwt.sign(payload,JWT_KEY,{expiresIn: "1h"})//signature (y headers y payload?)
                res.status(200).json({token: token});
            }else{
                res.status(400).json({msg: "Password Incorrect"});
            }
        }else{
            res.status(400).json({msg: "User does not exist"});
        }
    }catch(error){
        next(error)
    }
}

const userAuth = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt
        if(token){
            const idontknow = jwt.verify(token, JWT_KEY);
            console.log(idontknow)
        }else{
            return res.status(401).json({ message: "Not authorized, token not available" })
        }
    }catch(error){
        next(error);
    }    
}

module.exports = {createNewUser, swapStatus, getAllUsers, swapType, userLogin, userAuth}