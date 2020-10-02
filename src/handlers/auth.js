const { v4 } = require('uuid');
const db = require('../helper/db');
const { insertUser, getUser } = require('../helper/queries');
const { hashPassword, verifyPassword, signToken } = require('../helper/hashPassword');

async function createUser(req, res){
   const { userName, password } = req.body;
   if(!userName || !password) return res.status(400).send();
   
   const id = v4().toString();
   const hashed = hashPassword(password);
   try {
    await db.database.exec(insertUser(id, userName, hashed, Date.now().toString()));
    return res.status(201).send({ message: 'user saved' });
   } catch (error) {
     console.debug(error);
     return res.status(500).send();
   }
   

}

async function loginUser(req, res) {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).send();

    const user = await db.database.all(getUser(username));
    const token = await signToken({ user: user[0].username }, '24h');

    if(user){
        if(!verifyPassword(user[0].password, password)) {
            return res.status(401).send()
        }
        const cookieValidation = {
            maxAge: 24 * 60 * 60 * 1000,
            // the token can't be accessed in client-side javascript
            httpOnly: true,
            // forces to use https in production
            secure: process.env.NODE_ENV === 'production',
        };
        res.status(200).cookie('token', token, cookieValidation).redirect('/resources');
    }
    return res.status(401).send();
}

async function logout(req, res){
  res.clearCookie('token');
  return res.json({ message: 'logged out!' });
}

module.exports = {
    createUser,
    loginUser,
    logout
}