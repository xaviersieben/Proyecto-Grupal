const { Category } = require('../../db');
const { Product } = require('../../db');
const axios = require('axios');
const {apiArray} = require('./productfix')

const storeAllProducts = async () =>{
    try{
        await Product.bulkCreate(apiArray);
        console.log('Products correctly stored into the DB');
    }catch{
        console.log('Unexpected error while storing Products in the DB')
    }
}

const storeAllCategories = async () =>{
    try{
        const apiUrl = await axios.get('https://dummyjson.com/products/categories');
        const apiInfo = await apiUrl.data.map((e, index) => {
            return {
                id: index,
                name: e,
            }
        });
        await Category.bulkCreate(apiInfo);
        console.log('Categories correctly stored into the DB');
    }catch{
        console.log('Unexpected error while storing Categories in the DB')
    }
}

module.exports = {
    storeAllCategories,
    storeAllProducts,
}