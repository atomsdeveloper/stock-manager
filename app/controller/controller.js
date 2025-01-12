const model = require('../models/user-model')


// pages
const enter = (req, res) => res.status(200).render('index');
const home = (req, res) => res.status(200).render('home');

//routes
const login = async (req, res) => {
    try {
        const {user, email, pass} = req.body;
        const hasUser = await model.hasUser(user, email, pass);
        if (hasUser) {
            const {user, email, pass} = hasUser;
            if (user && email && pass == undefined || null) {
                res.status(201).json({message: "not content."});
            }
            return res.redirect('/home');
        } else {
            res.status(401).json({message: "invalid credentials."});
        }
    } catch {
        return res.status(500).json({message: "internal server error."});
    };
};

const registerUserManager = async  (req, res) => {
    try {
        const {name, email, password} = req.body;
        const register = await model.insertUserManager(name, email, password);
        console.log(register)
        if(register) {
            return res.status(200).json({message: 'insert user sucessful.'});
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
    registerUserManager
};