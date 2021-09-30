// The ids can be generated using:
// Date.now() % 1000000
const todos = [
  {id: 125223, todo: 'Feed Dogs', done: true},
  {id: 127904, todo: 'Learn Express', done: false},
  {id: 139608, todo: 'Buy Milk', done: false}
];

function deleteTodo(id) {
  // Find the index based on the id of the todo object
  const idx = todos.findIndex(todo => todo.id === parseInt(id));
  todos.splice(idx, 1);
}

function update(incoming_id, inc_obj) {
  for (let current_item of todos) {
    if (current_item.id == incoming_id) {
      console.log("found:",current_item)
      console.log("inc_obj:",inc_obj)
      current_item.todo = inc_obj.usertodo
    }
  }

}

function addStuffToArray(incoming_todo) {
  let obj = {}
  obj.id = Math.floor(Math.random() * 100000);
  obj.done = false
  obj.todo = incoming_todo
  todos.push(obj)
}


module.exports = {
  getAll,
  getOne,
  addStuffToArray,
  deleteTodo,
  update
};

function getOne(id) {
  // Use the Array.prototype.find iterator method
  return todos.find(todo => todo.id === parseInt(id));
}

function getAll() {
  return todos;
}