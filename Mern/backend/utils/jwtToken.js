// Creating Token and Saving in cookie  
const path=require("path")

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //option for cookie
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
   

    return res.sendFile(path.join(__dirname+'/shek.html'));
};

module.exports = sendToken