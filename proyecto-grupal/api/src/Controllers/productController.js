const productServices = require("../Services/productoService");
const { Product, Category } = require("../db.js");
const axios = require("axios");

const getAllProducts = async (req, res, next) => {
  const { name } = req.query;

  try {
    if (name) {
      const allProducts = await productServices.getAllProducts();
      res
        .status(200)
        .send(
          allProducts.filter((e) =>
            e.title.toLowerCase().includes(name.toLowerCase())
          )
        );
    } else {
      const allProducts = await productServices.getAllProducts();
      res.status(200).send(allProducts);
    }
  } catch (error) {
    next(error);
  }
};

const createNewProduct = async (req, res, next) => {
  const { body } = req;

  try {
    const newItemProduct = {
      id: body.id,
      title: body.title,
      description: body.description,
      price: body.price,
      rating: body.rating,
      stock: body.stock,
      brand: body.brand,
      categories: body.categories,
      thumbnail: body.thumbnail,
      images: body.images,
    };

    const category = body.category;
    console.log(category);
    const createProduct = await productServices.createNewProduct(
      newItemProduct,
      category
    );

    if (createProduct) {
      const newListProd = await productServices.getAllProducts();
      res.status(201).send(newListProd);
    }
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productById = await productServices.getProductById(id);
    if (productById) {
      res.status(200).send(productById);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
};
