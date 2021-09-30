// import the Order Model. I'm calling this OrderModel for clarity, but typically this variable is called Order
const OrderModel = require('../models/order.js'); 

module.exports = {
    create,
    index,
}

async function index(req, res) {
  try {
    // 1. grab all items from DB, sorted by date descending (being fancy!)
    let orders = await OrderModel.find({user: req.user._id}).sort({createdAt:'desc'}).exec();
    // 2. send to frontend
    res.status(200).json(orders)         
  } catch(err) {
    res.status(400).json(err);
  }
}

async function create(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    await OrderModel.create({lineItems: req.body.lineItems, user: req.user._id})
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json('ok')
 } catch(err) {
    res.status(400).json(err);
 }
}