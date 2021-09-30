<img src="https://i.imgur.com/l6BOk1u.png">

# Props in React

## Learning Objectives

| Students Will Be Able To: |
|---|
| Pass props to a child component |
| Render props passed to a component |

## Road Map

1. Starter Code / Setup
2. What are Props?
3. Passing Props
4. Essential Questions

## Starter Code / Setup

The starter code is the code from the last lesson/lab with the following changes:

- The red border styling has been removed from most components
- Lots of global styling has been added for our components in index.css. This is the absolute most wrong way to do CSS because it is not modular, and should be reserved for global things like buttons, not components (but we'll temporarily do it this way today until we learn two more correct ways, namely <strong>importing</strong> and <strong>modules</strong>, later this week.)

`cd` into today's student folder, and then the sei-cafe folder.

If you hit `ls` you will notice that there is a package.json file but no node_modules. How do we generate the node_modules that react will use?

If you said `npm install`, you are correct. So do this `npm install` first.

Secondly, start the React development server:  `npm start`

Once the dev server opens a tab to `localhost:3000`, and you should see some code similar to what we had last time.

Now let's turn our attention to **props**, which is the second super important concept of React, after components.

## What are Props?

You should be slightly familiar with props from the _Intro to JSX_ lesson.

A parent component uses props to pass data/state to child components. In the image below, we are passing a key/value pair
`color="purple"` down from the parent component (in red) to the child component (in yellow).

<img src="https://www.kirupa.com/react/images/color_property_144.png">

A prop is a key-value pair that looks much like an attribute=value pair in an HTML element.

As discussed in the JSX lesson, we use camelCasing to name our props instead of the-kebab-casing-preferred-in HTML.

Note that it's common to pass the same data as a prop, over and over, down the component hierarchy, from component to child, from grandfather to father to son, from mother to daughter, to whoever needs it.

## Passing Props

We're going to use props to pass data down from our parent `<App>` component to various child components for practice:
	1. We're going to pass down the string "Hungry?" from `<App>` down to `<OrderDetail>` and make it show up
	2. We're going to pass down the order number from `<App>` down to `<OrderDetail>` and make it show up (you do)
	3. We're going to pass down today's date from `<App>` down to `<OrderDetail>` and make it show up (you do - optional)

These are all somewhat contrived because none of these are dynamic/changing pieces of data, but useful to practice.

Where props really become useful is either:
- passing <strong>state</strong> down to a child (eg., the name of the currently logged in user: next lesson)
- passing a method down (eg., a click handler)

However, until we learn about state(next lesson!), or event handling yet (soon!), we will practice by passing strings and numbers.

## Passing Props: step 1. invent a key/value pair

The first prop we'll pass in sei-cafe will be a string "Hungry?" from `<App>` to the `<OrderDetail>` component within the `render` method in **App.js**. Right now, we are making our
`<OrderDetail>` show up in this way:

```js
<OrderDetail />
```

In order to pass a prop down, we must give the prop a name, eg.,
welcomeText, and a value, eg., "Hungry?". Change the above line to this:

```js
<OrderDetail welcomeText={"Hungry?!"} />
```

In general, you must use curly braces to values down. For simple strings, though, technically you can skip the curly braces (but template literals need to be surrounded by curly braces as well). 

## Passing Props: step 1.5: Verify the prop is being passed

We can now go to  `<OrderDetail>` component and work with the `welcomeText` prop, but there's a better way to check things like props and state - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

Just like how Chrome's DevTools are invaluable when it comes to troubleshooting the DOM, so are React's Developer Tools when it comes to troubleshooting a React app!

With the Chrome extension installed you will now see a **React** tab in Chrome's DevTools!

After clicking on the **React** tab, you can explore the component hierarchy. Select the `<OrderDetail>` component and then view the right-hand side:

<img src="https://user-images.githubusercontent.com/24878576/114323323-a2dba980-9af2-11eb-8cbd-dde9463f252e.png">

How exciting!

## Passing Props: Step 2: Accessing Passed Props

When a **Function Component** is being rendered, React will pass in props as the first argument to the function like this (arrow function syntax):

```js
const OrderDetail = (props) => (
	{props.welcomeText}
  ...etc...
```

or function declaration syntax):

```js
function OrderDetail(props) {
	console.log(props.welcomeText)
	alert(props.welcomeText)
	return (
		<div>
		{props.welcomeText}
	...etc...
```

However, a **Class Component** will access props via a property on the instance (`this`) like this:

```js
render() {
	return (
		<div>
		{this.props.myProp}
		...etc...
```

Let's use the `welcomeText` prop inside of `<OrderDetail>` to render a nice message when someone has an empty order.

Here's what we have before making any changes:

```js
function OrderDetail(props) {
  return (
      <div className='OrderDetail'>
        <div className='OrderDetail-heading'>
          <span>ORDER #5</span>
          <span>TODAYSDATE</span>
        </div>
        <div className='OrderDetail-container'>
          WELCOME TEXT HERE
        </div>
      </div>
  );
}
```

Now let's make the prop show up:
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
		{props.welcomeText}
        </div>
      </div>
  );
}
```


Check it out, your text should now show up instead of "WELCOME TEXT HERE"!

### Oops

I made it show the prop twice by mistake. Can you fix it?

#### Props Cannot be Changed

Props are immutable, their values are never to be changed.

Remember, the prop came from a component somewhere up the hierarchy and if the prop's value originated from state, it would be **that** component's responsibility to update its own state.

However, a component can certainly pass down via props methods that can be used to update its state - but that's for another day.

#### 💪 Exercise - Passing Props (5 mins)

Your turn to pass some props:

1. Task 1: The `<OrderDetail>` component will need to know the current order number, thus, pass a order number of your choosing (eg., 7) down from `<App>` for practice.

	> Note: The name of the prop can be anything.

2. Task 2: For more practice, try to pass down today's date from `<App>` down to `<OrderDetail>` and make it show up in place of TODAYSDATE.
3. Task 3 (optional but try it!): Try to pass down a `generateOrderNumber()` method from `<App>` to `<OrderDetail>`. 
	- Write a method in App.js (inside the class, but not inside the render function) that looks like this:
	```js
	generateOrderNumber() {
		return Math.floor(Math.random() * 1000)
	}
	```
	- Pass this function down as a prop to `<OrderDetail>`. Give it any name you want, such as myFunction, ie., `myFunction={this.generateOrderNumber}` (Note that, to pass a class method down, you have to use the `this` keyword to specify that the function is located within `this` particular class. Also note, no brackets. We're not executing it, just passing it.)
	- In the `<OrderDetail>` function component, make the function's return value show up by doing `{props.myFunction()}` (Note the brackets. Here we are executing it to hopefully make a random number show up.)

Check your work using the React Developer Tools.

Again, these examples are slightly contrived. Props are way more useful when we are: 
- passing down state (eg., name, email, current state of cart)
- passing down methods like handleLogout() for the child component to use when someone clicks the logout button.

We will be looking at the first of these cases today.

## Props Summarized

Let's summarize some key facts about props:

| props |
|---|
| `props` or `this.props` holds information passed down the component hierarchy |
| Props cannot be modified |
| It is possible to call for a parent to pass a method as a prop to its child., and the child can use this method to update the parent's state |

## ❓ Essential Questions

Take a minute to review the following questions:


1. **What is wrong with the following code:**

	```js
	function HelloIAmAChildComponent(props) {
	  props.elapsedTime += 1;
	  return (
	    <div>
	      Elapsed Time: {props.elapsedTime}
	    </div>
	  );
	}
	```
	
2. **When passing a prop down several levels of the component hierarchy, do we _have_ to name the prop the same each time it is passed?**

## References

[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

[Components and Props - React Docs](https://reactjs.org/docs/components-and-props.html)

[State and Lifecycle - React Docs](https://reactjs.org/docs/state-and-lifecycle.html)
