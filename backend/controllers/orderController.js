import { OrderStatus } from '@prisma/client';
import prisma from '../config/db.js';

export const createOrder = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    throw new Error('Korpa je prazna');
  }

  try {
    await prisma.$transaction(async (prisma) => {
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          return new Error(`Artikal sa ID-om ${product.id} nije pronađen.`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Nedovoljne zalihe artikla: ${product.name}`);
        }

        total += product.price * item.quantity;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });

        await prisma.product.update({
          where: { id: product.id },
          data: {
            stock: product.stock - item.quantity,
          },
        });
      }

      const order = await prisma.order.create({
        data: {
          userId: userId,
          total: total,
          status: 'PENDING',
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });

      res.status(201).json(order);
    });
  } catch (error) {
    res.status(500).json({ error: 'Kreiranje narudžbe nije uspjelo' });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          select: {
            productId: true,
            quantity: true,
            price: true,
          }
        },
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }


    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje narudžbe nije uspjelo' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          select: {
            id: true,
            productId: true,
            quantity: true,
            price: true
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          }
        }
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje narudžbi nije uspjelo' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(OrderStatus).includes(status)) {
    return res.status(400).json({ error: 'Dani status je pogrešan' })
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Ažuriranje narudžbe nije uspjelo' });
  }
};
