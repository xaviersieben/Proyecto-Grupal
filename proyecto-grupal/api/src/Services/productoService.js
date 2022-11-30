const { Product, Category } = require("../db.js");
const { Model } = require("sequelize");

const getAllProducts = async () => {
  const allProducts = await Product.findAll({
    include: [Category],
  });
  return allProducts;
};

const createNewProduct = async (newProduct, category) => {
  const cat = await Category.findOne({
    where: {
      name: category.name,
    },
  });
  console.log(cat);

  const productToInsert = {
    ...newProduct,
    categoryId: cat.id,
  };
  console.log(productToInsert);
  const createdProduct = await Product.create(productToInsert);

  return createdProduct;
};

const getProductById = async (id)=>{
  const productById = await Product.findByPk(id,{
    include: [Category],
  })
  return productById
}
module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
};
