<img src="https://i.imgur.com/l6BOk1u.png">

# State in React Pt. 1/2: Initializing and Accessing State

## Learning Objectives

| Students Will Be Able To: |
|---|
| Initialize a class component's state |
| Access a component's state |
| Pass state down to a child using props |
| What if we have an array in sate? Maps |

## Road Map

1. Starter Code / Setup
2. What is State?
3. Initializing State
4. Accessing State
6. Passing State down as Props
7. Arrays in State
9. Essential Questions

## Starter Code / Setup

As always, `cd` into this lesson's folder, and once you can see `package.json` but no `node_modules`, that should tell you that you need to run `npm install` to install your modules.

Then, start the React development server:  `npm start`

Once the dev server opens a tab to `localhost:3000`, let's take a look at the starter code, and remind ourselves of the components we have. There has been an additional `<LineItem>` component added in, representing a shopping cart item. At the moment, it is always a salad.

We are going to be replacing lots of hardcoded text values in these components and they will come from our application ***state***. In particular:

- The `<UserLogOut>` component has a fixed piece of text claiming we're logged in as international hip hop superstar Cardi B's `name` and `email`. These values need to instead reflect the current **state** of the app (that is, is someone logged in? what's their email? if nobody's logged in, show a "". It shouldn't just always be Cardi B).
- The `<CategoryList>` and `<MenuList>` components have a hardcoded list of menu categories. All salads, which is wrong. Instead, we must have these lists come from our application `state` (eg., grab the available menu items from the database)
- The `<OrderDetail>` component has a hardcoded `orderId`, `order total`, and `cart items` (line items). Again, all salads, which is wrong. These need to reflect the `state` of the shopping cart based on whatever the user has clicked on, not just 70 salads.

## What is State?

#### State In General

Simply put, **state** is data or information an application or component needs to implement its functionality.

Examples of state includes:

- An object representing the logged in user
- An array of todo objects
- A boolean representing whether a component's detail panel should be visible
- A number representing the selected or current index of an item in an array

I really like <a href="https://daveceddia.com/visual-guide-to-state-in-react/#what-react-state-looks-like">Dave Ceddia's explanation of state</a>.

I also really like the <a href="https://reactjs.org/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state">thinking in react guide's 3 questions</a> about whether a piece of data is part of the application `state` or not.

#### State in React

State in a React app is held in a class component's `state` property.

Since data/information can only be passed **down** the component hierarchy, not up, it's a good idea to keep state as high up in the hierarchy as possible, at least initially. Usually, the top of the hierarchy is the `<App>` component so this is where we put the state variable.

Only class components have state (we're pretending "hooks" don't exist until next week. These aren't the hooks you're looking for. Move along.)

#### Why do I need to care about this 'state' thing?
For one thing, whenever our app's state changes, react re-renders the component and its children. This updates the screen visually. This is one of the **killer features** of react. Remember assessment 1? When someone clicked a button, you had to:
- add an event listener to the button and when it was clicked, you had to:
- write code to go get the current increment value from the DOM (eg., +2 vs +3)
- do some calculations
- update state variables
- write code to manually visually update the "total" DOM element `myElement.innerHTML = new_value`. 

With react, you don't need to reach out into the DOM and grab values or update values. All you have to do is update the state, and react will do the dom stuff for you AUTOMATICALLY.


## High-level Checklist for implementing State in a react app

1. **Initializing state** - for each piece of state (eg., "has the user paid yet?"), you have to give your app an initial value when it first loads (eg., false)
2. **Accessing state** - over time, as your React app's state changes, various components need to access it. (eg., maybe the `<OrderDetail>` component needs to know if the user has paid yet, so it can show a nice 'thank you' message)
3. **Updating state** - this is the fun part! Components will often need to update the state too. For example, clicking Logout should update the "username" and "user email" state to be blank. Clicking "add to cart" should make an item show up in the cart. This is where it all pays off!


## ❓ Pop Quiz: What pieces of state does an app like the finished SEI-CAFE need to track?

Link to the finished app: <a href="https://sei-cafe.herokuapp.com/">Here</a>

> What pieces of data are changing from moment to moment, and important to update visually for the user? Eg., the currently logged-in user's name, the items in the cart
## State in sei-cafe

When we analyze the state for the FINISHED sei-cafe, we will find that our `<App>` component contains the following state:

<img src="https://user-images.githubusercontent.com/24878576/114325423-13d48e80-9afe-11eb-8bc3-1cb0f297b8dd.png">

Later, we will have several pages, and `<NewOrder>` will be just one component, and `<NewOrder>` will contain the following state itself:

<img src="https://user-images.githubusercontent.com/24878576/114325682-64002080-9aff-11eb-9268-63751d467d5a.png">

So, overall, we're going to need state for remembering:

1. The current logged-in-user's name. Blank if not logged in.
2. The current logged-in-user's email. Blank if not logged in.
3. This current order's orderID
4. Have they paid yet?
5. What is the total price of the shopping cart?
6. What categories of items are we currently even selling? (Maybe this comes from the database, and changes by season)
7. What items do they currently have in the cart?
- .... there are a few more things, but we will focus on these for now.

For now, we will start with these 7.

If evaluating an application's state and data structures seems difficult, that's okay, it takes a bit of experience. Soon enough, you'll be able to recognize scenarios that you've seen before and apply those previous data structures and patterns previously used.


## Step 1: Initializing State

First, you have to give your app an initial value for each item in state. This will be the app's state when you
first run the app, before the user has interacted with it. 

In a game of hangman, the initial state is 6 blank letters, 0 wrong guesses, 0 correct guesses, etc.

So let's initialize the state of our e-commerce app, and give them reasonable defaults like blanks, zeroes, and for arrays, we initialize state to be empty arrays. 
> For the "categories", this would normally come from the database, so for now we will just put them in ourselves.

In the finished app, once we've fetched the menu data from the database, and once our user starts doing things, these pieces of state will constantly change to reflect the state of the app at any moment.

This is how we can initialize 4 of our 7 pieces of state above. Declare the `state` variable just above the render() method:

```js
class App extends React.Component {
  state = {
      email: "",
      isPaid: false,
      categories: ["Sandwiches", "Seafood", "Mexican", "Italian", "Sides", "Desserts", "Drinks",],
      cartItems: [],
  }
  render() {
    return (
      <div className="App">
      ...etc...
```

As you see above, to add state to a class component, we just create a variable within the class named `state`. This `state` variable holds an object. Each property of the object represents a particular piece of state the application or component needs (eg., is the user Logged in? if yes, what is their username?)

> In js, this way of declaring a variable within a class is called **class property initializer syntax** but most languages call them class variables. This syntax is very very new (ES7+) and fun and easy! If you're interested in how things used to look like, where you had to declare a constructor and such, there are <a href="https://www.newline.co/fullstack-react/articles/use-property-initializers-for-cleaner-react-components/">lots of articles</a> on this topic.

#### How can I check that it worked?

Why, react Dev-tools, of course.

Try to verify with `react dev tools` that changing the state, makes it change in react dev tools. Right click on the `App` component and check that it has the values it is supposed to. Below is a screenshot of what it would have looked like if our SEI-CAFE were finished. What do you see instead?

<img height="500" src="https://user-images.githubusercontent.com/24878576/114325423-13d48e80-9afe-11eb-8bc3-1cb0f297b8dd.png">

#### Does All Information Belong in State?

So the answer to the question: _Does All Information Belong in State?_ is "no", not if the information never changes or if it does change, you don't want to cause components to re-render.

When you have data that doesn't change, or don't want to re-render if it changes, we can define that data elsewhere.

#### 💪 Exercise - Initializing State (10 min)

Okay, your turn to initialize a couple of more pieces of state to sei-cafe. Using the same `state` "class variable":

1. `name`: initialize the name variable within the state object to be the currently logged in user. What's a good initial value for name, which is a string?
2. `orderTotal`: when the app first loads, and we don't have a logged-in user even, what should the orderTotal be set to? We haven't even clicked on any items yet.
3. `currentOrderId`: this will later be an order id string. What would be a good initial value for this?
4. Verify using React Dev Tools that your `<App>` component contains all of our 7 pieces of state.

## Step 2- accessing state (ie., make it show up)

Alright, so we have a bunch of default state. Wonderful. Now what? The next step is to put the state where it needs to be. This is called accessing state.

The **easiest case** is if we need a piece of state to be right in the App component, where the state is located. In that case, we would just do something like below.

```js
class App extends React.Component {
  state = {
      name: "",
      email: "",
      currentOrderId: "---",
      isPaid: false,
      orderTotal: 0,
      categories: ["Sandwiches", "Seafood", "Mexican", "Italian", "Sides", "Desserts", "Drinks",],
      cartItems: [],
  }
  render() {
    return (
      <div className="App">
        <nav className="nav">
          {/* this is a JSX comment! Below is how we make our state show up: */}
          {this.state.orderTotal}
          {this.state.orderTotal}
      ...etc...
```

#### You do: Try it yourself

- Choose 1 or 2 properties of our `state` object and get them to show up on the `<App>` component
- Verify if what you see matches what you see in the react dev Tools

What if state is needed in a child component? Props to anyone who knows the answer.
> The answer is props

#### Using props to pass state, parent to child

Recall from this morning that props were used in order to transport data from parent to child:
<img src="https://camo.githubusercontent.com/eded1b72d83bc89255460c36758952c2c93e766360bd23021bf8eec7ddce4e61/68747470733a2f2f7777772e6b69727570612e636f6d2f72656163742f696d616765732f636f6c6f725f70726f70657274795f3134342e706e67">

For example, recall that we defined a prop called `welcomeText` which contained the string `"Hungry?"` in App.js (parent) like this:

```js
<OrderDetail welcomeText={"Hungry?!"} />
```

And then made the prop show up in the child component like this:

```js
function OrderDetail(props) {
  return (
      <div className='OrderDetail'>
        <div className='OrderDetail-heading'>
          <span>ORDER #5</span>
          <span>TODAYSDATE</span>
        </div>
	<div className='OrderDetail-container'>
		{props.welcomeText}
```

This resulted in the word "Hungry?!" showing up in the OrderDetail component.

Similarly, we can use props to pass our pieces of state down from `<App>` to the component where it's needed. Let's run through a couple of examples:

#### Example: Let's improve `<OrderDetail>`'s order number

Let's update the fake orderid in our <OrderDetail> component to reflect the values in the `state` of the app. 

**Step 1** of passing props is to invent a key/value pair like `myProp={5}`. In this case, we don't want 5, though ,we want whatever orderId is in the state. So we could do `myProp={this.state.currentOrderId}` (or even better `currentOrderId={this.state.currentOrderId}`).

So Change this in App.js:

```js
  render() {
    return (
      <div className="App">
        <nav className="nav">
            <Logo />
            <CategoryList />
            <UserLogOut />
        </nav>
        <MenuList />
        <OrderDetail />
        ...etc...
```

to

```js
  render() {
    return (
      <div className="App">
        <nav className="nav">
            <Logo />
            <CategoryList />
            <UserLogOut />
        </nav>
        <MenuList />
        {/* Invent a prop currentOrderId and put our state into it*/}
        <OrderDetail currentOrderId={this.state.currentOrderId} />
        ...etc...
```

**Step 2** of passing props is to make it show up in the child. So in the OrderDetail.jsx, change this:

```js
  return (
      <div className='OrderDetail'>
        <div className='OrderDetail-heading'>
          <span>ORDER #5</span>
          ...etc...
```

to this

```js
  return (
      <div className='OrderDetail'>
        <div className='OrderDetail-heading'>
          <span>ORDER #{props.currentOrderId}</span>
          ...etc...
```

Now observe that **if we change the orderID in the state, the orderID ***AUTOMATICALLY*** changes**! So if we change the state, IT SHOWS UP. Tomorrow, we will complete the lesson and we will look at how to make state change by user clicks (instead of just manually changing state). But first, practice accessing state & passing it down:

## You do: Pass state down - practice tasks

1. The `<OrderDetail>` component has a hardcoded order total that shows $75. Make this value change to be whatever is stored in state (the `orderTotal` property). Test that it works by changing the state in code, or in react dev tools.
2. The `<UserLogout>` component has hardcoded `name` and `email` fields. Make the name and email values change to whatever is stored in state (the `name` and `email` properties in state). Test that it works by changing the state in code, or in react dev tools.


## Step 3- updating state

Now that we know how a component can access the state, we will look at how to make user clicks can change the state., and we will be able to do cool DOM stuff without touching the DOM! ....but that's tomorrow. Can't give you all our secrets in one day! ;)


## Wait wait, what about the arrays? How to access arrays that are in state?!!

For the react students lab, you will note that sometimes we have to access arrays that are in state, and make them render as nice JSX. Let's use the `<CategoryList>`, `<MenuList>`, and the list of shopping cart items (line items) in `<OrderDetail>` as an example.

# Working with JSX Arrays

When rendering JSX, in addition to being able to render individual builtins and userdefineds like this:
```js
 return(
   <div>
      <h1>Hello I am JSX</h1>
   </div>
 )
```
You can also render an array of builtins like this:
```js
return(
  <div>
     {[<li>Dessert</li>, <li>Sandwiches</li>, <li>Drinks</li>]}
  </div>
)
```
or You can render an array of userdefineds with or without props like this:
```js
return(
  <div>
    {[<MenuListItem name='Hamburger' />, <MenuListItem name='Turkey Sandwich' />]}
  </div>
)
```

So, we can often build out an array of JSX components, and then just render that array somewhere.

## Steps for making an array in state show up as JSX

> Important - you'll need this for your React Students Lab, and the exercise below)

The basic steps to do this is as follows:
1. **Pass the state array down** to whichever child component will be rendering the array
    - You will have to invent a prop & also access the array from state - eg., `<TargetComponent myPropName={this.state.categories} />`
2. Create **an array of JSX** builtins or userdefineds, either using a for loop, or map, typically before the return(JSX)
3. Render the JSX array as part of your return(JSX) just like we did above. `{myJSXArray}`

## Examples

Let's start off by initializing our state temporarily to give us some data to work with. Let's change up the salads a little...

Let's change these lines in our `state` object:
```js
  ...etc...
  categories: ["Sandwiches", "Seafood", "Mexican", "Italian", "Sides", "Desserts", "Drinks",],
  cartItems: [],
  ...etc...
```

to the following.:

```js
    menuItems: [ // TEMPORARY: normally should be initialized to [] and populated from DB
      {id:"0",name:"Hamburger", price:5.95, emoji:"🍔", category: "Sandwiches"},
      {id:"1",name:"Ice Cream", price:1.95, emoji:"🍨",category: "Desserts"},
    ],
    menuCategories: ["Sandwiches", "Desserts"], // TEMPORARY: normally should be initialized to [] and populated from DB
    activeCategory: "Sandwiches",
    lineItems: [ // TEMPORARY: to test checkout. normally the initial cart is []
      {qty:2, item: {id:"0",name:"Hamburger", price:5.95, emoji:"🍔", category: "Sandwiches"}},
      {qty:2, item: {id:"1",name:"Ice Cream", price:1.95, emoji:"🍨",category: "Desserts"}},
    ],
```

We have 3 arrays now to work with:
1. menuItems and menuCategories should ideally come from the DB, but for now we will put in some test data. 
2. lineItems is standard lingo meaning shopping cart items and we're putting in some test data since we have no DB yet.
3. We're also putting in this activeCategory to represent what category the user has just clicked on (eg., sandwiches)

## Example 1 - Making a string array (Categories) show up

Right now our `<CategoryList>` component just has some hardcoded `<li>` in it, and it's not using our array of `menuCategories`. Let's replace these `<li>` with our `menuCategories`.

First, pass down the `menuCategories` into the `<CategoryList>` by using props.

Change

```js
  <CategoryList />
```

to

```js
  <CategoryList categories={this.state.menuCategories} />
```

Second, let's go into `CategoryList.jsx` and make these `menuCategories` show up.

#### Option 1: Making an array show up with a map (declarative)

The react way of doing this would be to use the `map` function to change these fixed categories to the categories coming in via props. 

To try it, change this code:

```js
function CategoryList(props) {
  return (
      <div>
        <ul className='CategoryList'>
          <li>Sandwiches</li>
          <li>Desserts</li>
        </ul>
      </div>
  );
}
```

to this:

```js
function CategoryList(props) {
  return (
      <div>
        <ul className='CategoryList'>
          {/* For each c in categories, eg., "Sandwiches" or "Desserts" */}
          {/* - this map will render <li>"Sandwiches"</li> or */}
          {/* - this map will render <li>"Desserts"</li>*/}
          {props.categories.map(c => <li>{c}</li>)}
        </ul>
      </div>
  );
}
```
The map above takes each element in the props, c,categories array, and makes it show up surrounded by a pair of `<li>` `</li>`.

#### Option 2: Making an array show up with a for of loop(imperative)

Another way to do the above would be:
```js
function CategoryList(props) {
  // for each c in the categories (eg., "Desserts", "Sandwich", etc),
  // add <li>"Desserts"</li> to the new array arr
  let arr = []
  for (let c of props.categories) {
    arr.push(<li>{c}</li>)
  }
  return (
      <div>
        <ul className='CategoryList'>
          {/* make the array arr show up */}
          {arr}
        </ul>
      </div>
  );
}
```

Whatever is in your state should now show up in your category list! :O

## Example 2 - Array of objects: Making the `menuItems` show up in the `<MenuList>`.

The category list was an array of strings (easier) but most of the time, we will have in our state an array of objects from the database, such as our `menuItems` array, and we'll want to make it show up nicely -- eg., in our `<MenuList>` component in the middle.

A `<MenuList>` isn't comprised of straight up `<li>` but is comprised of multiple `<MenuListItem>`. Within `<MenuList>`, we must write **a map or a loop** to make each of the `menuItems` show up as a `<MenuListItem>`. 

First, if we want our `menuItems` to show up within the `<MenuList>`, we must pass down the `menuItems` to it using props.

So change

```js
  <MenuList />
```

to:

```js
  <MenuList menuItems={this.state.menuItems} />
```

Second, let's go into `MenuList.jsx` and make these `menuItems` show up.

In MenuList.jsx, change

```js
function MenuList(props) {
  return (
      <div  className="MenuList">
        <MenuListItem />
        <MenuListItem />
      </div>
  );
}
```
to

```js
function MenuList(props) {
  return (
      <div className="MenuList">
        {/* For each m in menuitems (eg., {id:"0",name:"Hamburger", price:5.95, emoji:"🍔", category: "Sandwiches"}, */}
        {/*                             or {id:"1",name:"Ice Cream", price:1.95, emoji:"🍨",category: "Desserts"}, */}
        {/* make a MenuListItem show up. */}
        {/* Additionally, give the menuListItem the current m's name + price */}
        {props.menuItems.map(m =>
          <MenuListItem name={m.name} price={m.price}/>
        )}
      </div>
  );
}
```

Thirdly, instead of `<MenuListItem>` always being "Green Salad" $3.95, let's make the name and price change based on the prop received. So change in **MenuListItem.jsx**:

```js
function MenuListItem(props) {
  return (
    <div className="MenuListItem">
      <div className="emoji flex-ctr-ctr">🥗</div>
      <div className="name">Green Salad</div>
      <div className="buy">
        <span>$3.95</span>
        ...etc...
```

to

```js
function MenuListItem(props) {
  return (
    <div className="MenuListItem">
      <div className="emoji flex-ctr-ctr">🥗</div>
      <div className="name">{props.name}</div>
      <div className="buy">
        <span>${props.price}</span>
```

Oh great it works! Wait a minute --- why is the emoji still a green salad?
Fix it!

Great!

## You do: Make the `lineItems` array show up in the cart!

1. First, in App.js's render method, invent a prop to pass the `lineItems` array from state down to `<OrderDetail>`. (hint: very similar to what we did with MenuList)
2. Second, in OrderDetail.jsx, remove the fixed `<LineItem />` JSX
3. In its place, write a **map** that will, for every item in the lineItems array, make a `<LineItem />` component show up (similar to what we did with MenuList)
4. Finally, whilst making the `<LineItem />` show up, make sure to pass appropriate props so that the items in the cart don't all just have the name green salad, price 3.95, quantity 70.

#### Want additional practice with accessing arrays? Check out the react students lab for a good challenge!

## References

[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

[State and Lifecycle - React Docs](https://reactjs.org/docs/state-and-lifecycle.html)
