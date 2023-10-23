const {constants} = require("../constants")
const errorHandler = (errreq,res,next) => {
 const statusCode = res.statusCode ? res.statusCode : 500;

 switch (statusCode) {
    case constants.VALIDATION_ERROR:
        res.json({  title: "Invalid",
         message: errorHandler.message,
        stackTrace: errorHandler.stack});
        break;

    case constants.UNAUTHORIZED:
        res.json({  title: "Unauthorized",
         message: errorHandler.message,
        stackTrace: errorHandler.stack});
        break;

    case constants.SERVER_ERROR:
        res.json({  title: "Server error",
         message: errorHandler.message,
        stackTrace: errorHandler.stack});
        break;

    case constants.FORBIDDEN:
        res.json({  title: "Forbidden",
         message: errorHandler.message,
        stackTrace: errorHandler.stack});
        break;

    case constants.NOT_FOUND:
        res.json({  title: "Not found", 
        message: errorHandler.message,
         stackTrace: errorHandler.stack});
    default:
        console.log("No Error, All good !")
        break;
 }
 

};

module.exports = errorHandler;