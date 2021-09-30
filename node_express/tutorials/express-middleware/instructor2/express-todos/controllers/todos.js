var TodoModel = require('../models/todo');

module.exports = {
  index:index,
  show,
  //newTodo : newTodo, <-- longform
  newTodo, // <-- shorthand if function name and key name are same
  create,
  deleteOne,
  edit, 
  update,
};

function edit(req,res) {
  let todo_to_edit = TodoModel.getOne(req.params.id)
  res.render('todos/edit.ejs', { todo_to_edit })
}

function update(req,res) {
  TodoModel.update(req.params.id, req.body)
  res.send("thank you for your update")
}

function deleteOne(req,res) {
  TodoModel.deleteTodo(req.params.id)
  console.log(TodoModel.getAll())
  res.send("thank you")
}

function create(req, res) {
  console.log(req.body);
  TodoModel.addStuffToArray(req.body.usertodo)
  console.log(Todo.getAll())
  res.redirect('/');
}

function newTodo(req, res) {
  res.render('todos/new.ejs')
}

function index(req, res) {
  res.render('todos/index', {
    todos: TodoModel.getAll()
  });
}

function show(req, res) {
  res.render('todos/show', {
    todo: TodoModel.getOne(req.params.id),
    // Would like to display the number of the todo within the list
    todoNum: TodoModel.getAll().findIndex(todo => todo.id === parseInt(req.params.id)) + 1
  });
}
