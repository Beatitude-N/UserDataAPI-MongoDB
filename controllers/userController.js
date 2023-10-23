const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@acess public
const registerUser = asyncHandler(async (req,res)=>{
     const { name, username, email, password } = req.body;
     if (!name || !username || !email || !password) {
        return res.status(400).json({
             success: false,
             message: "All fields are mandatory" 
            });
        }

    const userAvailable = await userModel.findOne({email});
    if (userAvailable) {
        return res.status(400).json({
             success: false,
             message: "User with this mail already registered!" 
            });
        }
    //Hash password
    const HashedPassword = await bcrypt.hash(password, 10)   
    console.log("Hash password: ", HashedPassword);

    const newUser = await userModel.create({
        name,
        username,
        email,
        password: HashedPassword
    })
    console.log(`User created ${newUser}`)
    return res.status(200).json({
        success: true,
        message: "Register the user",
       data:  newUser,
    });
});


//@desc Login user
//@route POST /api/users/login
//@acess public
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory!" 
           });
    } 
    const user = await userModel.findOne({email});
    //compare passowrd with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },

        
        process.env.ACCESS_TOKEN_SECRET,
       // { expiresIn: "15m" }
        );

      

        return res.status(200).json({
            success: true,
            message: "login user",
            accessToken,
        });
    }else{
        res.status(401).json({
            success: false,
            message: "email or password is not valid" 
           });
    }
});


//@desc Current user info
//@route POST /api/users/current
//@acess private
const currentUser = asyncHandler(async (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "Current user information",
        data: req.user,
    });
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};