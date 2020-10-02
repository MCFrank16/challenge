module.exports = function checkToken(req, res, next) {
const url = req.originalUrl;
if(req.cookies){
    const { token } = req.cookies;
   
    req.token = {
        token,
        url
    };
    return next();
} else {
    req.token = {
        token: '',
        url
    }
    return next();
}
}
