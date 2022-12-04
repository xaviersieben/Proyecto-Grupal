const { Order, User,OrderDetail,Product } = require("../db.js");

const createNewOrder = async (userId, amount) => {
  try {
    const findUser = await User.findByPk(userId);

    const newOrder = await Order.create({
      amount: amount,
      userId:userId,
    });

    return newOrder;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async () => {
  const allOrders = await Order.findAll({
    include: [OrderDetail],
  });
  return allOrders;
};

module.exports = {
  createNewOrder,
  getAllOrders,
};
