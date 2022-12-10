const { Order, User, OrderDetail, Product } = require("../db.js");

const ordersServices = require("../Services/orderService");

const createNewOrder = async (req, res, next) => {
  try {
    let createdOrder;

    const userId = req.body.id;

    createdOrder = await ordersServices.createNewOrder(
      userId,
      req.body.price,
      req.body.quantity
    );

    for (let i = 0; i < req.body.pedido.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].name,
        },
      });

      const detailOrderCreate = await OrderDetail.create({
        quantity: req.body.pedido[i].quantity,
        price: req.body.price,
        productId: prodId[0].dataValues.id,
        orderId: createdOrder.dataValues.id,
      });
    }

    if (createdOrder) {
      res.status(201).send(createdOrder);
    } else {
      res.status(404).send("Error creating order!");
    }
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await ordersServices.getAllOrders();

    if (allOrders) {
      res.status(201).send(allOrders);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ordById = await ordersServices.getOrderById(id);
    if (ordById) {
      res.status(200).send(ordById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const order = await ordersServices.getOrders(id);
    !order ? res.status(404).send("There are no orders...") : null;

    const updated = await Order.update(
      { status: "cancelled" },
      {
        where: {
          id: id,
        },
      }
    );

    let createdOrder;

    const userId = req.body.id;

    createdOrder = await ordersServices.createNewOrder(
      id,
      userId,
      req.body.price,
      req.body.quantity
    );

    for (let i = 0; i < req.body.pedido.length; i++) {
      const prodId = await Product.findAll({
        where: {
          title: req.body.pedido[i].name,
        },
      });

      const detailOrderCreate = await OrderDetail.create({
        quantity: req.body.pedido[i].quantity,
        price: req.body.price,
        productId: prodId[0].dataValues.id,
        orderId: createdOrder.dataValues.id,
      });
    }

    if (createdOrder) {
      const listOrder = await ordersServices.getAllOrders();
      return res.status(200).send(listOrder);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  createNewOrder,
  updateOrder,
  getOrderById,
};
