require('dotenv').config()
module.exports = {
  secret: process.env.JWT_SECRET_KEY,   
  jwtRefreshExpiration: 86400,   // 24 hours

};