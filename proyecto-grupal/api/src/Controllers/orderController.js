const { Order, User } = require("../db.js");

const ordersServices = require("../Services/orderService");


const createNewOrder = async (req, res, next) => {
  
  try {
   
    let createdOrder

    const  userId = req.body.userId

    const orderFound = await Order.findOne({where:{email:userId,payed:false}})

    if(orderFound){
      orderUpdated = await Order.update({amount:req.body.amount},{where:{email:userId,payed:false},returning:true})
      createdOrder = orderUpdated[1][0]
      console.log(createdOrder)
      
    }else {
      createdOrder = await ordersServices.createNewOrder(userId,req.body.amount);
    }
    await OrderDetail.destroy({where:{UserEmail:userId,payed:false}})
     
    let arrPromises = boxes.map(async(box)=>{
      let findBox = await Box.findOne({
        where:{
          name: box.name
        }
      })
      let newItem = OrderDetail.create({
        box_id:findBox.dataValues.id,
        quantity:box.quantity,
        is_gift:box.isGift,
        UserEmail:userId,
        order_id:createdOrder.dataValues.id,
        recipient:box.recipient
      })
      return newItem
    })
    
    await Promise.all(arrPromises)

    await ordersServices.createGiftList(boxes)

    

    if (createdOrder) {
      res.status(201).send(createdOrder);
    } else {
      res.status(404).send("Error creating order!");
    }
  } catch (error) {
    next(error);
  }
};