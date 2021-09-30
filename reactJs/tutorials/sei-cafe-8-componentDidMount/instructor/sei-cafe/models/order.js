const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  lineItems: [{qty: Number, item: {name: String, emoji: String, category: String, price: Number}}],
}, {
  timestamps: true,
});

let OrderModel = mongoose.model('Order', orderSchema); // .model compiles the schema into a model
module.exports = OrderModel;                           // export model