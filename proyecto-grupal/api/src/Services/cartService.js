const { Cart } = require("../db.js");


const saveUserCart = async (cart)=>{

  const {id} = cart
  const cartFound = await Cart.findOne({
    where:{
      id:id
    }
  })

  if(cartFound){
    var newCart = Cart.update(cart,{
      where:{
        id:id
      }
    })
  }else{

    var newCart = Cart.create(cart)
  }

  return newCart
}

const getUserCart = (user) => {
  const userCart = Cart.findOne({where:{user_id:user}})
  return userCart
}

module.exports = {
  saveUserCart,
  getUserCart
};