const model = require('../models/user-model')


// pages
const enter = (req, res) => res.status(200).render('index');
const home = (req, res) => res.status(200).render('home');

//routes
const login = async (req, res) => {
    try {
        const {user, email, pass} = req.body;
        console.log(user)
        
        const hasUser = await model.hasUser(user, email, pass);

        if (hasUser) {
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
        const response = await model.insertUserManager(name, email, password);

        if (response == null) {
            return res.status(422).json({message: 'insert user failed per duplicate email.'});
        }

        if(response.email) {
            return res.status(200).json({message: 'insert user sucessful.'});
        }    
    } catch (error) {
        return res.status(500).json({message: "internal server error.", error});
    }
};

module.exports = {
    enter,
    home,
    login,
    registerUserManager
};