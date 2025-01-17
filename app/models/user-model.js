// Hash
const bcrypt = require('bcrypt');

// Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hasUser = async (_, email, pass) => {
    // create session user manager
    try {
        const user = await prisma.userManager.findUnique({
            where: {
                email: email,
            },
        });

        if(user) {
            const match = bcrypt.compare(pass, user.password);
        
            if (match) {
                return {user}; // Senha correta
            } else {
                throw new Error('Invalid credentials'); // Senha incorreta
            }
            
        } else {
            throw new Error('not is possible return a user.');
        };
    } catch (error) {
        throw error;
    };
};

const insertUserManager = async (name, email, pass) => {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const hashPass = await bcrypt.hash(pass, saltRounds);

    try {
        const fetchEmail = await prisma.userManager.findUnique({
            where: {
                email: email
            }
        });

        if(fetchEmail) { 
           return null         
        }            

        const newUser = await prisma.userManager.create({
            data: {
                name: name,
                email: email,
                password: hashPass,
                created_at: new Date()
            },
        });

        return newUser
    } catch (error) {
        throw new Error('internal database error.');
    };
};

module.exports = {
    hasUser,
    insertUserManager
};