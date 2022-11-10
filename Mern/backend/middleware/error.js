const ErrorHandler = require("../utils/errorHandler");
const path =require("path")


module.exports = (err,req,res,next)=>{
    // console.log(err);
    err.statuscode = err.statuscode || 500
    err.message = err.message || "Internal server Error";
    
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400)
    }
    return res.status(err.statuscode).sendFile(path.join(__dirname+'/shek.html'));
    // res..json({
    //     success : false,
    //     error : err.statuscode,
    //     message:err.message
    // })
}