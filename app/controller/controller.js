const model = require('../models/user-model')


const enter = (req, res) => res.status(200).render('index');

const home = async (req, res) => {
    const {user, pass} = req.body;

    try {
        await model.hasUser(user, pass);
        return res.status(200).render('home');
    } catch {

    }
};

module.exports = {
    enter,
    home
}