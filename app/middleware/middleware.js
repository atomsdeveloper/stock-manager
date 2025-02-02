require('dotenv').config();

const jwt = require('jsonwebtoken');

const hasKey = async (req, res, next) => {
    const key = await req.headers['x-api-key'];

    if (!key || key != process.env.API_KEY_INSERT_USER) {
        return res.status(403).json({ message: 'invalid key' });
    }
    next();
};

const checkFields = async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(422).json({ message: 'not content' });
    }
    next();
}

const checkBearerToken = async (req, res, next) => {
    const hasToken = req.headers['authorization'];
    console.log(hasToken);

    if (!hasToken) {
        return res.status(401).json({ message: 'no token provided.' });
    }

    const token = hasToken.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: 'invalid token.' });
        }

        req.user = user
        next();
    })
}

module.exports = {
    hasKey,
    checkFields,
    checkBearerToken
}