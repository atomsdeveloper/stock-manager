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

        if (!user) {
            throw new Error('not is possible return a user.');
        }

        const match = await bcrypt.compare(pass, user.password);

        if (!match) {
            throw new Error('Invalid credentials. Try again later or Check your credentials.');
        }

        return { user };

    } catch (error) {
        return error;
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

        if (fetchEmail) {
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

const getProducts = async (req, res) => {
    const { price, category } = req.query;

    const filter = {};
    if (price) filter.price = { lte: Number(price) };
    if (category) filter.category = category;


    if (filter.lenght < 0) {
        return products = await prisma.product.findMany({
            include: {
                category: true // Inclui a categoria associada ao produto
            }
        });
    }

    const products = await prisma.product.findMany({
        where: filter,
        include: {
            category: true, // Inclui a categoria associada ao produto
        },
    });

    if (!products) {
        throw new Error('not exists products.');
    }

    return products;
}
module.exports = {
    hasUser,
    insertUserManager,
    getProducts
};