const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async(req,res, next) => {
    let token;
    let AuthHeader = req.headers.Authorization || req.headers.authorization;
    if (AuthHeader && AuthHeader.startsWith("Bearer")) {
        token = AuthHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "User is not authorized" 
                   });
            }
            req.user = decoded.user;
            next();

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "User is not authorized" 
                   });
            }
        })
    }
})

module.exports = validateToken;