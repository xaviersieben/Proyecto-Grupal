const userServices = require('../Services/userService.js');
const { User } = require('../db.js');

const createNewUser = async (req, res, next) => {
    const { body } = req;
    try{
        const myUser = {
            name: body.name,
            surname: body.surname,
            password: body.password,
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
module.exports = {createNewUser}