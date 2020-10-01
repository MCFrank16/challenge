require('dotenv').config();
const crypto = require('crypto');
const { verify, sign } = require('jsonwebtoken');


// PASSWORD HELPERS
function hashPassword(data) {
    return crypto.createHmac('sha256', process.env.PRIVATEKEY)
      .update(data)
      .digest('hex');
}
  
function verifyPassword(hashed, plain) {
    return hashed === hashPassword(plain);
}

// TOKEN HELPERS
async function signToken(payload, expiresIn) {
    return sign(payload, process.env.PRIVATEKEY , { expiresIn });
}

function verifyToken(token) {
    try {
      verify(token, process.env.PUBLICKEY, { algorithms: ['RS256'] });
      return true;
    } catch (err) {
      return false;
    }
}


module.exports = {
    hashPassword,
    verifyPassword,
    signToken,
    verifyToken
}
