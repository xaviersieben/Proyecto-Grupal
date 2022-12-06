const { Order, User,OrderDetail,Product } = require("../db.js");

const createNewOrder = async (userId, amount,quantity) => {
  try {
    const findUser = await User.findByPk(userId);

    const newOrder = await Order.create({
      price: amount,
      userId:userId,
      quantity:quantity
    });

    return newOrder;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  const allOrders = await Order.findAll({
    include: [{model: OrderDetail,include:[Product]}],
  });
  return allOrders;
};

module.exports = {
  createNewOrder,
  getAllOrders,
};
