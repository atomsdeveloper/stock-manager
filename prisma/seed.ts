import { PrismaClient } from '@prisma/client';

// Hash
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const pass = "123adm"
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const hashPass = await bcrypt.hash(pass, saltRounds);

  // Criação de Usuário Administrativo 
  await prisma.userManager.create({
    data: {
      name: 'Renan',
      email: 'renan@gmail.com',
      password: hashPass,
      created_at: new Date(),
    },
  });

  // Criação de Usuário
  const user = await prisma.user.create({
    data: {
      name: 'Renan Nascimento',
      email: 'renan@example.com',
      password: '123',
      street: 'Rua Exemplo, 123',
      city: 'São Paulo',
      state: 'SP',
      postal_code: 12345678,
      country: 'Brasil',
      created_at: new Date(),
    },
  });

  // Criando uma sessão para esse usuário
  await prisma.session.create({
    data: {
      sessionToken: 'token_aleatorio_aqui',
      user_id: user.id,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Expira em 24 horas
    },
  });

  // Criação de categorias
  await prisma.category.createMany({
    data: [
      { name: 'Categoria 1', image_url: 'https://example.com/categoria1.jpg', created_at: new Date() },
      { name: 'Categoria 2', image_url: 'https://example.com/categoria2.jpg', created_at: new Date() },
      { name: 'Categoria 3', image_url: 'https://example.com/categoria3.jpg', created_at: new Date() },
      { name: 'Categoria 4', image_url: 'https://example.com/categoria4.jpg', created_at: new Date() },
      { name: 'Categoria 5', image_url: 'https://example.com/categoria5.jpg', created_at: new Date() },
    ],
  });

  const allCategories = await prisma.category.findMany();
  // Criação de produtos
  const products = await prisma.product.createMany({
    data: [
      { name: 'Produto 1', image_url: 'https://example.com/produto1.jpg', text: 'Descrição do Produto 1', discountPercentage: 10, category_id: allCategories[0].id, price: 100.0, stock_quantity: 50, created_at: new Date() },
      { name: 'Produto 2', image_url: 'https://example.com/produto2.jpg', text: 'Descrição do Produto 2', discountPercentage: 15, category_id: allCategories[1].id, price: 150.0, stock_quantity: 30, created_at: new Date() },
      { name: 'Produto 3', image_url: 'https://example.com/produto3.jpg', text: 'Descrição do Produto 3', discountPercentage: 20, category_id: allCategories[2].id, price: 200.0, stock_quantity: 20, created_at: new Date() },
      { name: 'Produto 4', image_url: 'https://example.com/produto4.jpg', text: 'Descrição do Produto 4', discountPercentage: 5, category_id: allCategories[3].id, price: 250.0, stock_quantity: 10, created_at: new Date() },
      { name: 'Produto 5', image_url: 'https://example.com/produto5.jpg', text: 'Descrição do Produto 5', discountPercentage: 0, category_id: allCategories[4].id, price: 300.0, stock_quantity: 5, created_at: new Date() },
    ],
  });

  // Criação de Pedido
  const order = await prisma.order.create({
    data: {
      user_id: user.id,
      subtotalPrice: 100.0,
      totalPrice: 90.0,
      totalDiscounts: 10.0,
      createdAt: new Date(),
      status: 'CONFIRMED',
    },
  });

  // Criando um pagamento vinculado ao pedido
  await prisma.payment.create({
    data: {
      payment_method: 'Credit Card',
      amount: order.totalPrice.toNumber(), // Convertendo Decimal para Float
      created_at: new Date(),
      order_id: order.id, // Relacionamento com o pedido
    },
  });

  // Criação de pedidos
  const allUsers = await prisma.user.findMany();

  await prisma.order.createMany({
    data: [
      { user_id: allUsers[0].id, subtotalPrice: 100.0, totalPrice: 90.0, totalDiscounts: 10.0, createdAt: new Date(), status: 'CONFIRMED' },
    ]
  });

  // Criação de OrderProduct
  const allOrders = await prisma.order.findMany();
  const allProducts = await prisma.product.findMany();

  await prisma.orderProduct.createMany({
    data: [
      { order_id: allOrders[0].id, product_id: allProducts[0].id, quantity: 2, created_at: new Date() },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
