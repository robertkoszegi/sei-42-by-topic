// import the Item and Category Models. Typically these names aren't suffixed with the word -Model
const ItemModel = require('../models/item.js'); 
const CategoryModel = require('../models/category.js'); 

module.exports = {
    itemsIndex,
    catsIndex,
}

async function itemsIndex(req, res) {
  try {
    let items = await ItemModel.find().populate('category').exec() // 1. grab all items from DB
    res.status(200).json(items)        // 2. send to frontend
  } catch(err) {
    res.status(400).json(err);
  }
}

async function catsIndex(req, res) {
  try {
    let cats = await CategoryModel.find() // 1. grab all cats from DB
    res.status(200).json(cats)            // 2. send to frontend
  } catch(err) {
    res.status(400).json(err);
  }
}