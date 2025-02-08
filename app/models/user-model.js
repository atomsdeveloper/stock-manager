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
    const { price, category, discount, stock } = req.query;

    const filter = {};
    if (price && !isNaN(Number(price))) {
        filter.price = { lte: parseFloat(price) };
    }

    if (discount && !isNaN(Number(discount))) {
        filter.discountPercentage = { lte: Number(discount) };
    }


    if (stock && !isNaN(Number(stock))) {
        filter.stock_quantity = { lte: Number(stock) };
    }
    console.log(stock)

    if (category) {
        filter.category = { id: String(category) };
    }

    try {
        // Se não houver filtros retorna todos os produtos
        if (Object.keys(filter).length === 0) {
            const products = await prisma.product.findMany({
                include: { category: true },
            });
            const categories = await prisma.category.findMany()

            return { products, categories };
        }

        // Se houver filtros armazena na váriavel `products` todos os produtos com os filtros aplicados.
        const products = await prisma.product.findMany({
            where: filter,
            include: {
                category: true
            }
        });

        const categories = await prisma.category.findMany();

        if (products.length <= 0) {
            return { products, categories }
        } else {
            return { products, categories };
        }

    } catch (error) {
        console.error("Error fetching products:", error);
        return { message: 'Internal server error.' };
    }
}
module.exports = {
    hasUser,
    insertUserManager,
    getProducts
};