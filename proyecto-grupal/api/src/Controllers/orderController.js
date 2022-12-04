const { Order, User, OrderDetail, Product } = require("../db.js");

const ordersServices = require("../Services/orderService");

const createNewOrder = async (req, res, next) => {
  try {
    let createdOrder;

    const userId = req.body.userId;

    createdOrder = await ordersServices.createNewOrder(userId, req.body.amount);

    const detailOrderCreate = await OrderDetail.create({
      quantity: req.body.quantity,
      price: req.body.amount,
      order_id:createdOrder.dataValues.id
    });

    const prodId = await Product.findAll({
      where: {
        id: req.body.product_id,
      },
    });

    await detailOrderCreate.addProduct(prodId);

    if (createdOrder) {
      res.status(201).send([createdOrder, detailOrderCreate]);
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

module.exports = {
  getAllOrders,
  createNewOrder,
};
