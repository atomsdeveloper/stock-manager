// Hash
const bycrypt = require('bcrypt');

// Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hasUser = async (user, email, pass) => {
    try {
        // check session user

        const userExist = await prisma.user.findUnique({
            where: {
                name: user,
                email: email,
                password: pass,
            },
        });

        const match = await bycrypt.compare(pass, userExist.password);

        if(userExist && match) {
            return {userExist};
        };
        throw new Error('not is possible return a user.');
    } catch (error) {
        throw error;
    };
};

const insertUserManager = async (name, email, pass) => {
    const saltRounds = process.env.SALT_ROUNDS;
    const hashPass = await bycrypt.hash(pass, saltRounds);

    try {
        const user = await prisma.userManager.create({
            data: {
                name: name,
                email: email,
                password: hashPass,
                created_at: new Date()
            },
        })

        if(user) {
            return user;
        };
    } catch (error) {
        throw res.status(500).json({message: "internal database error."});
    };
};

module.exports = {
    hasUser,
    insertUserManager
};