const { Category } = require("../db.js");
const axios = require("axios");

 // --------get("/temperaments")------------------
 const getCategory = async (req, res) => {
  try {
          
          const categoryDB = await Category.findAll({ 
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },        
          });

      if (categoryDB) 
      { return res.status(200).json( categoryDB ); }
      else 
      { return res.status(404).send("Categories not found"); }
         
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getCategory
};
