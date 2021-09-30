<img src="https://i.imgur.com/dwlIlek.png">

# Component Lifecycle Methods
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case for lifecycle methods |
| List the three phases of a component's lifecycle |
| Override/implement a lifecycle method |

## Road Map

- Setup
- The Lifecycle of Components
- The Lifecycle Methods
- A Component's Lifecycle
- Overriding Lifecycle Methods
- Fetching the menu from SEI CAFE when the app is mounted
- Essential Questions

## Setup


To get set up for this lesson:

- `cd` into today's `student` folder
- Open the project in VS Code
- Open a terminal session (`ctrl + backtick`)
- Just in case, install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`
- Start the backend: `nodemon server.js`
### Setup .env for server

Your server may complain of an error due to not having a .env file.

Your instructor will provide you with either:
1. a DATABASE_URL for your .env file that looks like this:

> DATABASE_URL=mongodb+srv://sei_rocks_1:sei_rocks_1@cluster0.px94f.mongodb.net/SEI_CAFE_DB?retryWrites=true&w=majority

2. or instructions on how to use the `seed.js` file to populate your local mongoDB database, in which case your .env will use your local mongoDB install and will look like this:

>DATABASE_URL=mongodb://localhost/sei_cafe_DB

### Starter code

The starter code for this lesson is nearly the same as the solution code from the Fullstack lesson, except for a few minor changes:
- Our backend has an item and category model in the DB
- Our NewOrderPage component has state initialized to empty arrays! --- finally!

The main task of this lesson will be to send an AJAX/fetch GET request to our DB and:
- fetch the menu from the database
- fetch the categories from the database

The hard part? Doing this only once, whenever the **NewOrderPage** component is first run. That's where we need `componentDidMount` and the lifecycle:

## The Lifecycle of Components

#### What are Lifecycle Methods

When a React app first loads and when state is changed, React components may be instantiated, updated, or destroyed.

React's `Component` has several methods that React automatically invokes during a component's lifecycle process.

When we subclass `Component` using `extends` our custom class component inherits those methods.

For example, you are already familiar with a couple of them: `constructor` and `render`.

#### Why do Lifecycle Methods Exist?

In many React apps, sometimes overriding just the `render` method is not enough.

**Lifecycle methods enable developers to write code that executes during the stages of a component's lifetime.**

The ability to "hook" code into a component's lifecycle is why these methods are also referred to as "lifecycle hooks" (not to be confused with the React's latest "Hooks" API).

Some use cases that require overriding certain lifecycle methods include:

- Making AJAX calls
- Performing animations
- Performance optimization
- Creating/destroying resources such as timers

## The Lifecycle Methods

First, a heads up that the release of React version 16.3 brought significant changes to React's lifecycle methods as React moves toward an [async rendering mode](https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html). A couple of lifecycle methods have been deprecated (marked for removal in a later version).

In this lesson, we will not work with any of the deprecated lifecycle methods...

### Common Lifecycle Methods

The following diagrams the **common** lifecycle methods of components:

<img src="https://i.imgur.com/BeR38kf.png">

These three main **phases** of a component's **lifecycle** are known as:

- **Mounting** - the phase that occurs when an instance of a component is being created and inserted into the DOM.
- **Updating** - the phase that occurs when a component is already in the DOM but is being re-rendered when state and/or props change.
- and **Unmounting** - the phase that occurs when a component is being removed from the DOM and destroyed.

In the above diagram, there are five lifecycle methods (in bold):

- **constructor**: Runs when a component is being rendered for the first time.
- **render**: Runs first render, then whenever
	- `setState` is called
	- New props are received
	- `forceUpdate` is called (not recommended)
- **componentDidMount**: Called after the first render.
- **componentDidUpdate**: Called after subsequent renders.
- **componentWillUnmount**: Called just before a component will be removed from the DOM.

### Less-common Lifecycle Methods

For completeness, the following diagram includes the **less-common** lifecycle methods:

<img src="https://i.imgur.com/xANapyE.png">

As explained by [this React blog post](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html), you will rarely ever have to use these less-common lifecycle methods.

## Overriding the Lifecycle Methods

To use any of the lifecycle methods, the component must be defined using a class - Function Components do not have lifecycle methods.

Overriding a lifecycle method is done the same way we override any method inherited from a superclass - by simply defining the method within the class.

Let's review constructors & override the `componentDidMount` method in **App.js**:

```js
  // 1. a constructor is a JAVASCRIPT method. Every class in js lets you define an optional constructor method (if you don't define one, it will happen implicitly. we're in effect just overriding the default one.)
  // 2. the constructor is run when the class is first created by javascript
  // 3. typically, a constructor is where we initialize class variables to be used in class methods (we used to have to put state in here)
class App extends React.Component {
  constructor() { 
    super() // part of constructor boilerplate
    this.state = { // a more classic way of declaring state
      testNumber: 0,
      testString: "0",
    }
  }

  // componentDidMount is a REACT-specific method that runs when our component is 'mounted'/inserted into the DOM
  // since it only runs once, this is a good place to populate your state with data from the databse
  componentDidMount() {
    console.log('App: componentDidMount');
  }  

  render() {
    ...etc...
```

Checking the console of the browser should now show `App: componentDidMount` logged out.

#### 💪 Practice (5 mins)

Continuing to modify **App.js**:

1. Add a `console.log('App: constructor')` to the constructor.
2. Add a `console.log('App: render');` within the `render` method.
3. Define a `componentDidUpdate` method with a `console.log('App: componentDidUpdate');`.

After the app loads, the console should look something like this:

<img src="https://i.imgur.com/TclU7Di.png">

Using react dev tools to change the App state will trigger an update resulting in the console now looking something like:

<img src="https://i.imgur.com/06qGRaE.png">

Note how the `constructor` and `componentDidMount` methods did not run a second time because `<App>` already exists (been mounted) in the DOM.

Instead, just as the diagram shows, the `render` and `componentDidUpdate` methods ran in response to `setState` being called.

## Performing our initial Fetch in SEI CAFE


Let's write some code to use `componentDidMount()` to fetch our initial menu items, and categories list from the database.

#### Seeding the database

As instructed above, you will either use an instructor-provided, cloud-based atlas DATABASE_URL for your .env file or use the provided seed.js file to populate your local DB, and set DATABASE_URL=mongodb://localhost/sei_cafe_DB.

#### Grabbing our menu from the DB.... just once.

In **NewOrderPage.jsx**, add in the following above the render() method:

```jsx
async componentDidMount() {
  try {
    let fetchItemsResponse = await fetch('/api/items') // <-- get data from server (Stream object)
    let fetchCatsResponse = await fetch('/api/categories')
    let items = await fetchItemsResponse.json(); // <------- convert fetch response into a js object
    let cats = await fetchCatsResponse.json();
    this.setState({ menuItems: items, menuCategories: cats})
  } catch (err) {
    console.error('ERROR:', err) // <-- log if error
  }
}

render() {
  ...etc...
```

Now our frontend is sending a fetch to `GET /api/items` and `GET /api/categories` to our backend when our component is mounted! Yay.


<details>
<summary><strong>Review - why did we put our initial fetch code into componentDidMount()? Why not in render()?</strong></summary>
<p><li><strong>Because, unlike render, this method only runs ONCE when the component mounts.</strong></li></p>
</details>




But, wait a minute.. why isn't this working? Our backend seems to be sending back a 404...

### Backend code

In server.js, mount a new `items` router:
```js
// this one is going to do double duty, serving both items and categories-related routes:
app.use('/api', require('./routes/api/items.js'));
```

Then create a file in `routes/api/` called `items.js`, and put this code in there:
```js
// routes/api/items.js

const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/items');

// GET /api/items
router.get('/items', itemsCtrl.itemsIndex)
// GET /api/categories/
router.get('/categories', itemsCtrl.catsIndex)

module.exports = router;
```

And finally, create a file in `controllers/` called `items.js` and put in the controller code:
```js
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
```

Let's test it out... .and... oh no! Errors! 

Console logging or using the debugger reveals that our categories is an array of objects of the form `[{id:"0", name:"Sandwiches"},{id:"1", name: "Seafood"},...]` but our `<CategoryList />` expects an array of the form `["Sandwiches", "Seafood", ...]`. So let's fix it up with a map. 

Replace these two lines in `componentDidMount()`:

```js
    let cats = await fetchCatsResponse.json();
    this.setState({ menuItems: items, menuCategories: cats})
```

with these lines which use a map to convert the array into its desired form:

```js
  let catsObjects = await fetchCatsResponse.json();
  // To make <CategoryList> happy, convert [{"id":"0", name:"sandwiches"},{..] => ["sandwiches",..]
  let catsStrings = catsObjects.map(c => c.name)
  this.setState({ menuItems: items, menuCategories: catsStrings})
```

Great. Now we are **fetching** our menu from the database **each time the NewOrderPage component is mounted**.

<img src="https://user-images.githubusercontent.com/24878576/115335644-95b26080-a16b-11eb-9c27-3b03330b7f8a.png">

**ComponentDidMount** ftw!


## You do: Task: OrderHistory (20 minutes)

Prep: Make sure the DB has some orders to grab - For this task, If you need a database populated with orders, your instructor will either provide a DATABASE_URL to a pre-populated one, OR you may use the handleCheckout method from yesterday's fullstack lesson to populate the order database yourself.

Task: Use `componentDidMount` in the `<OrderHistoryPage>` component to fetch the orders from the DB. You'll need to:
1. Convert OrderHistoryPage to a class component (2 minutes)
2. frontend: write the fetch in componentDidMount to GET the orders from the server at the address GET /api/orders. Just add the orders to state for now. (5 minutes)
3. backend: write a router, controller to grab the orders from the database (10 minutes)
4. We can go over the answers together

## Bonus Optional Task 2: Filtering the menu

1. Update the `activeCategory` property of state in `<NewOrderPage>` to change based on the category just clicked.
2. Using the `activeCategory`, make the `<MenuList>` only show items from the selected category.


Let's wrap up with a couple of questions...

## ❓ Essential Questions

1. **What do lifecycle methods allow developers to do?**

2. **What lifecycle method is typically used to initially fetch data from an API or database?.**

3. **Suppose our fetch takes a LONG time. How can we present a nice loading message/screen to our user while that happens?**

## References

[React Docs - The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)



