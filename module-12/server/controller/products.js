const products = require("../data/products.json");

const getAll = () => new Promise((resolve) => {
    return resolve({code: 200, data: JSON.stringify(products)});
})

const getById = (id) => new Promise((resolve) => {
    const product = products.find((item) => item.id === id);

    if(product){
        resolve({code: 200, data: JSON.stringify(product)});
    }else{
        resolve({code: 400, data: JSON.stringify({message : `Product with the ${id} doesn't exist!`})});
    }
})

module.exports = {
    getAll,getById,
};