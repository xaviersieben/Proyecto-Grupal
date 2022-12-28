const { Product, Review } = require("../db.js");
const { uploadImage, deleteImage } = require("../utils/cloudinary.js");

let newComment = false;

const getComments = async (req, res) => {
  const { id } = req.params;
  const { order } = req.query;

  let orderBy = "DESC";

  try {
    if (newComment) {
      newComment = false;
      const ratingDB = await Review.findAndCountAll({
        where: { ProductId: id },
        attributes: ["rating"],
      });

      let plus = 0;
      ratingDB.rows.map((e) => (plus = plus + e.rating));

      const newRating = plus / ratingDB.count;

      await Product.update({ rating: newRating.toFixed(2) }, { where: { id } });
    }

    if (order) orderBy = order;
    const product = await Product.findAll({
      where: { id },
      attributes: ["rating"],
      include: {
        model: Review,
      },
      order: [[Review, "createdAt", orderBy]],
    });

    product.length !== 0
      ? res.status(200).json(product)
      : res.status(200).json("Product not found");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postComments = async (req, res) => {
  const { image, commentRate } = req.body;
  const { comment, rating, idProduct, idOrder } = commentRate;

  let img;
  let public_id;

  if (image) {
    let imageUploaded = await uploadImage(image);
    img = imageUploaded.secure_url;
    public_id = imageUploaded.public_id.split("/")[1];
  }

  try {
    await Review.create({
      comment: comment,
      rating: rating,
      orderId: idOrder,
      productId: idProduct,
      image: img,
      public_id: public_id,
    });

    const ratingDB = await Review.findAndCountAll({
      where: { productId: idProduct },
      attributes: ["rating"],
    });

    let plus = 0;
    ratingDB.rows.map((e) => (plus = plus + e.rating));

    const newRating = plus / ratingDB.count;

    await Product.update(
      { rating: newRating.toFixed(2) },
      { where: { id: idProduct } }
    );

    newComment = true;
    res.status(200).json("Review added successfully");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteComments = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByPk(id);
    await Review.destroy({ where: { id } });
    await deleteImage(review.public_id);

    const ratingDB = await Review.findAndCountAll({
      where: { ProductId: review.productId },
      attributes: ["rating"],
    });

    let newRating = 0;

    if (ratingDB.count > 0) {
      let plus = 0;
      ratingDB.rows.map((e) => (plus = plus + e.rating));
      newRating = plus / ratingDB.count;
    }

    await Product.update(
      { rating: newRating.toFixed(2) },
      { where: { id: review.ProductId } }
    );

    res.status(200).json("Review has been deleted");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getComments,
  postComments,
  deleteComments,
};
