const model = require('../models/user-model')


// pages
const enter = (req, res) => res.status(200).render('index');
const home = (req, res) => res.status(200).render('home');

//routes
const login = async (req, res) => {
    try {
        const {user, pass} = req.body;
        const hasUser = await model.hasUser(user, pass);
        if (hasUser) {
            const {user, pass} = hasUser;
            return user && pass != undefined && res.redirect('/home');
        } else {
            res.status(401).json({message: "invalid credentials."});
        }
    } catch {
        return res.status(500).json({message: "internal server error."});
    };
};

const register = async  (req, res) => {
    try {
        const {name, email, pass} = req.body;
        const register = await model.insertUser(name, email, pass);
        if(register) {
            const {name, email, pass} = register;
            return name && email && pass != undefined && res.status(200).json({message: 'insert user sucessful.'});
        } else {
            res.status(401).json({message: "faleid insert user."});
        }
    } catch {
        return res.status(500).json({message: "internal server error."});
    }
};

module.exports = {
    enter,
    home,
    login,
    register
};