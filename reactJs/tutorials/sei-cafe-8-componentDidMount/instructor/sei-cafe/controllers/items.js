const ItemModel = require("../models/item");
const CategoryModel = require("../models/category");

module.exports = {
  itemsIndex,
  catsIndex,
};

async function itemsIndex(req, res) {
  try {
    let items = await ItemModel.find().populate("category").exec();
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function catsIndex(req, res) {
  try {
    let cats = await CategoryModel.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(400).json(err);
  }
}
