const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hasUser = async (user, pass) => {
    try {
        const user = await prisma.users.findOne({
            data: {
                name: nome,
                pass: senha,
                user: usuario,
                house: casa
            }
        });
        return user;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    hasUser,
};