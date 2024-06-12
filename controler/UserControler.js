const { response } = require("express");
const User = require("../model/UserModel");

const SignUp = async (req, res) => {
    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password;
    
    if (Email && Username && Password) {
        try {

            const existingUser = await User.findOne({ Email });
            if (existingUser) {
                return res.status(400).json({
                    msg: "Email already in use"
                });
            }
            
            await User.create({
                Email,
                Username,
                Password
            });
            res.json({
                msg: "user created successfully"
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                msg: "Error creating user",
                error: e.message
            });
        }
    } else {
        res.status(400).json({
            msg: "Please provide Email, Username, and Password"
        });
    }
};

const UserLogin=async (req,res)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;

    const FindUser=await User.findOne({ Username })
if(FindUser){
    
}else{
    res.json({
         msg:"Login Failed"
    })
}
   
}

module.exports = { SignUp,
    UserLogin
 };
