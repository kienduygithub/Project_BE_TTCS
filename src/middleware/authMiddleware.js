import jwt from 'jsonwebtoken'
require('dotenv').config()
const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication error',
            })
        }
        // const { payload } = user;
        const payload = user;
        if (payload?.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication admin'
            })
        }
    })
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication error',
            })
        }
        // const { payload } = user;
        const payload = user;
        if (payload?.isAdmin || payload.id == userId) {
            console.log('true')
            next();
        } else {
            return res.status(404).json({
                status: 'ERR',
                message: 'The authentication user'
            })
        }
    })
}

module.exports = {
    authMiddleware,
    authUserMiddleware,
}