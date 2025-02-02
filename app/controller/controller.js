// Database
const model = require('../models/user-model');

// Token
const jwt = require('jsonwebtoken');

// Enviroment Variable
require('dotenv').config();

// pages
const home = async (req, res) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    return res.status(200).json({ message: 'Access' })
}
const accountUser = (req, res) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    return res.status(200).json({ message: 'Access' })
}

//routes
const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const hasUser = await model.hasUser(name, email, password);
        const { user } = hasUser

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // O token expirará em 1 hora
        });

        res.setHeader('Authorization', `Bearer ${token}`)
        return res.status(200).json({ message: "success", token: token, user: { name, email } });

    } catch (error) {
        if (error.message) {
            return res.status(401).json({ message: 'Invalid credentials. Try again later or Check your credentials.' });
        }
        return res.status(500).json({ message: "internal server error." });
    };
};
const registerUserManager = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const response = await model.insertUserManager(name, email, password);

        if (response == null) {
            return res.status(422).json({ message: 'insert user failed per duplicate email.' });
        }

        if (response.email) {
            return res.status(200).json({ message: 'insert user sucessful.' });
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error.", error });
    }
};

const getProducts = async (req, res) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const products = await model.getProducts();
    console.log(products)

    if (!products) {
        return res.status(201).json({ message: 'Not data to proccess' })
    }

    return res.status(200).json({ message: 'data to proccess seccessful', products: products })
}

module.exports = {
    home,
    login,
    registerUserManager,
    accountUser,
    getProducts
};