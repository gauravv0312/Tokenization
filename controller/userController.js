const bcrypt = require('bcrypt');
const userModel = require('../model/user');
const CookieToken = require('../utils/cookieToken');

const signup = (req,res)=>{
     return new Promise(async(resolve,reject)=>{
        try {
            const{name,email,phoneNumber,password} = req.body;
            if(!(name && email && phoneNumber && password)){
                res.status(400).send('All field is required');
            }

            const alreadyRegister = await userModel.findOne({email});
            if(alreadyRegister)
                 res.status(409).send('User Already Exist.Please try another email......');

           const encryptedPassword = await bcrypt.hash(password,10);
           
           const user = await userModel.create({
            name,
            email : email.toLowerCase(),
            phoneNumber,
            password : encryptedPassword,
           })
           .catch((err)=>reject({
            message : err.message,
           }))
//          use to don't send the password in response
        //    user.password = undefined
                   
           resolve(
            // res.status(201).cookie('token',token)

            CookieToken(user,res)
           )
        } catch (error) {
            reject({
                message : error.message,
            })
        }
     });
};

const login = (req,res)=>{
    return new Promise(async(resolve,reject)=>{
         try {
            const {email,password} = req.body;

            if(!(email && password)){
                res.status(400).send("All field are required...........")
            }

            const user = await userModel.findOne({email});
            if(user && (await bcrypt.compare(password,user.password))){
                // user.password = undefined

                resolve(
                   CookieToken(user,res)
                );
            }
            reject(res.status(400).send("Invalid Credentials"));
         } catch (error) {
            console.log(error);
         }
    });
}



module.exports = {signup,login};