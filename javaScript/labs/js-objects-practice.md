![](https://i.imgur.com/hGEeDR1.png)

# JavaScript Objects<br> Additional Practice (NOT a deliverable!)

## Intro

Javascript objects are something you are going to be using all the time going forward from this week, and continuing onwards 
into Unit 2 and Unit 4 -- their importance cannot be overstated!

To that end, here are some external exercises to give you some basic practice with objects in increasing order of difficulty. You can do these in a new repl.it or codepen.

<i>(Attribution: Some of these exercises were adopted from the online textbook at https://github.com/workshopper/javascripting)</i>

## Level 0: W3Schools
<ul>
  <li><a href="https://www.w3schools.com/js/exercise_js.asp?filename=exercise_js_objects1">Basic Objects Practice 1 (W3Schools)</a></li>
</ul>

## Level 1:

Objects are lists of values similar to arrays, except values are identified by keys instead of integers.

Here is an example:

```js
const foodPreferences = {
  pizza: 'yum',
  salad: 'gross'
}
```

### The challenge:

Define a variable named `pizza` like this:

```js
const pizza = {
  toppings: ['cheese', 'sauce', 'pepperoni'],
  crust: 'deep dish',
  serves: 2
}
```

Use `console.log()` to print the `pizza` object to the terminal.


## Level 2: Object Properties

You can access and manipulate object properties –– the keys and values that an object contains –– using a method very similar to arrays.

Here's an example using **square brackets**:

```js
const example = {
  pizza: 'yummy'
}

console.log(example['pizza'])
```

The above code will print the string `'yummy'` to the terminal.

Alternately, you can use **dot notation** to get identical results:

```js
example.pizza

example['pizza']
```

The two lines of code above will both return `yummy`.

### The challenge:

Ddefine a variable named `food` like this:

```js
const food = {
  types: 'only pizza'
}
```

Use `console.log()` to print the `types` property of the `food` object to the terminal.

## Level 3: Object Keys

JavaScript provides a native way of listing all the available keys of an object. This can be helpful for looping through all the properties of an object and manipulating their values accordingly.

Here's an example of listing all object keys using the **Object.keys()**
prototype method.

```js
const car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020
}
const keys = Object.keys(car)

console.log(keys)
```

The above code will print an array of strings, where each string is a key in the car object. `['make', 'model', 'year']`

### The challenge:

Define a variable named `car` like this:

```js
const car = {
  make: 'Honda',
  model: 'Accord',
  year: 2020
}
```

Then define another variable named `keys` like this:
```js
const keys = Object.keys(car)
```

Use `console.log()` to print the `keys` variable to the terminal.

## Level 4: Arrays of Objects

Objects are frequently found in arrays. For example, in Unit 2, when we look at databases, we might encounter a database of products like this:

```js
let products = [
{id:"1", name:"LG Big Screen TV", price:400},
{id:"2", name:"Iphone X", price: 500},
{id:"3", name:"Google Pixel 5", price: 300},
{id: "4", name:"Plantronics Headset", price: 150},
]
```

### The challenge(s)


1. Use `console.log()` to print just the names of the products to the terminal.</li>
1. Use `console.log()` to print the total price to the terminal</li>
1. (Bonus) Use `console.log()` to print the product that has the highest price to the terminal</li>

