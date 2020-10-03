const db = require('../helper/db');
const { v4 } = require('uuid');
const { getUser, insertUser, deleteUser } = require('../helper/queries');
const { verifyPassword, signToken } = require('../helper/hashPassword');
const { hashPassword } = require('../helper/hashPassword');


async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
      const user = {
        id: v4().toString(),
        username: 'Human',
        password: hashPassword('BITEBITE')
      };

      await db.database.exec(insertUser(user.id, user.username, user.password, new Date().toLocaleDateString()));
      if(!username || !password) return res.status(400).send();

    const newUser = await db.database.all(getUser(username));
    const token = await signToken({ user: newUser[0].username }, '24h');

    if(newUser){
        if(!verifyPassword(newUser[0].password, password)) {
            return res.status(401).send()
        }
        const cookieValidation = {
            maxAge: 24 * 60 * 60 * 1000,
            // the token can't be accessed in client-side javascript
            httpOnly: true,
            // forces to use https in production
            secure: process.env.NODE_ENV === 'production',
        };
        await db.database.exec(deleteUser(username));
        return res.status(200).cookie('token', token, cookieValidation).redirect('/resources');
    }
    return res.status(401).send();
        
    } catch (error) {
      console.debug(error);
      return res.status(500).send();
    }
}

async function logout(req, res){
  res.clearCookie('token');
  return res.status(200).redirect('/');
}

module.exports = {
    loginUser,
    logout
}