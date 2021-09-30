var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos');
const todo = require('../models/todo');

// const todos = [
//     {id: 125223, todo: 'Feed Dogs', done: true},
//     {id: 127904, todo: 'Learn Express', done: false},
//     {id: 139608, todo: 'Buy Milk', done: false}
//   ];


router.get('/', todosCtrl.index);
router.get('/new', todosCtrl.newTodo);
router.post('/', todosCtrl.create)
router.delete('/:id', todosCtrl.deleteOne)

router.get('/:id/edit', todosCtrl.edit)
router.put('/:id', todosCtrl.update)

// 1. sending the user the form
// router.get('/new', function(req,res) {
//     res.render('todos/new.ejs')
// })
// router.post('/create', function(req,res) {
//     res.send("this is my req.body:" + req.body)
// })
router.get('/:id', todosCtrl.show);



module.exports = router;
