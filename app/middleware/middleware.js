require('dotenv').config();

const hasKey = async (req, res, next) => {
    const key = await req.headers['x-api-key'];

    if(!key || key != process.env.API_KEY_INSERT_USER) {
        return res.status(403).json({message: 'invalid key'});
    }
    next();
};

const checkFields = async (req, res, next) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        return res.status(422).json({message: 'not content'});
    }
    next();
}

module.exports = {
    hasKey,
    checkFields,
}