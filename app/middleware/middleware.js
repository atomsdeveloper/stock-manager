require('dotenv').config();

const hasKey = (req, res, next) => {
    const key = req.headers['x-api-key'];

    if(!key || key != process.env.API_KEY_INSERT_USER) {
        return res.status(403).json({message: 'invalid key'});
    }
    next();
};

module.exports = {
    hasKey,
}