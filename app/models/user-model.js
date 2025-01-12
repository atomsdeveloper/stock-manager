const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hasUser = async (user, pass) => {
    try {
        if(user && pass) {
            return {user, pass};
        } else {
            return false
        }
    } catch (error) {
        throw error;
    };
};

const insertUser = async (name, email, pass) => {
    try {
        if(name && email && pass) {
            return {name, email, pass};
        } else {
            return false
        }
    } catch (error) {
        throw error;
    };
};

module.exports = {
    hasUser,
    insertUser
};