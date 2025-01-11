const model = require('../models/user-model')


// pages
const enter = (req, res) => res.status(200).render('index');
const home = (req, res) => res.status(200).render('home');

//routes
const login = async  (req, res) => {
    try {
        const {user, pass} = req.body;
        const hasUser = await model.hasUser(user, pass);
        if (hasUser) {
            const {user, pass} = hasUser;
            return user && pass != undefined && res.redirect('/home')
        } else {
            res.status(401).json({message: "invalid credentials"})
        }
    } catch {
        return res.status(500).json({message: "internal server error"});
    }
};

module.exports = {
    enter,
    home,
    login
}