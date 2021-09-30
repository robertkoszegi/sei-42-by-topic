<img src="https://i.imgur.com/48HIUiX.jpg">

# Event Handling in React
---

## Learning Objectives

| Students Will Be Able To |
|---|
| Use event props to attach event handlers |
| Pass an event handler (method) to a child component |
| Ensure event handlers that need to modify state have `this` bound to the proper context (component) |
| Use ES2017's Property Initializer syntax to efficiently and concisely bind methods |
| Optionally pass arguments to event handlers |

## Roadmap

- Setup
- Review the Starter Code
- Browser Events in React
- Event Handlers (methods)
- Summary
- Essential Questions
- Further Study - The Synthetic Event Object

## Setup


To get set up for this lesson:

- `cd` into today's student folder
- Open the project in VS Code
- Open a terminal in VSCode (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

## Review the Starter Code

React's dev server will automatically open SEI-CAFE in the browser, which should look like this:

<img src="https://user-images.githubusercontent.com/24878576/114502656-22a06b80-9bfa-11eb-8779-12b2b20a8fc1.png">

## Browser Events in React

First, **what are some common browser events we've worked with during SEI so far?**

In case you need to be reminded, [here you go!](https://developer.mozilla.org/en-US/docs/Web/Events).

Like many things in React, event handling is a little different than what we are used to.

Let's see how...

#### Connecting Handler Code to Events in React

In React, we do not add event listeners using JavaScript's `addEventListener` method.

Instead, we assign event handling functions to certain "event" props on React Elements (`<div>`, `<p>`, etc.).

Let's see this by adding an anonymous arrow function as a click handler on the "logout" button within the `<UserLogOut>` component. 

Change this in **UserLogOut.jsx**:
```js
function UserLogOut(props) {
  return (
      <div className='UserLogOut'>
        Name: {props.name}<br />
        Email: {props.email}<br />
        <button>Logout</button>
      </div>
  );
}
```

to this:

```js
function UserLogOut(props) {
  return (
      <div className='UserLogOut'>
        Name: {props.name}<br />
        Email: {props.email}<br />
        {/* add the onClick below */}
        <button onClick={() => alert('cardi B is logging out!')}>Logout</button>
      </div>
  );
}
```
Just a baby-step `alert` for now - test it out.

Event observations thus far:

- The names for event props are camelCased (`onClick`). In HTML, the attribute would be `onclick`. Here's the [list of events](https://facebook.github.io/react/docs/events.html#supported-events) supported by React.
- The JS expression (always within curly braces) assigned to an event prop must evaluate to a **function**. A function type, **not** a function call (unless that function call returns a function).
- In native JS, if the event handler function returns `false`, it prevents the default behavior of that event and stops event bubbling (same as calling both the `preventDefault()` & `stopPropagation()` methods). However, in React we must call the `preventDefault()` method on the **Synthetic Event** object.

> One last question - what is the best practice code formatting/indentation when a component has more than a couple of props?

## Event Handlers (methods)

Okay, we just popped up an alert when the button in the `<UserLogOut>` was clicked by using an anonymous arrow function as an event handler.

More commonly though, the event handler will need to update some state in response to an event.

Questions:

<details>
	<summary>What method do we call to update a component's state?</summary>
<p>

```js
setState()
```
</p>
</details>


<details>
	<summary>Where do we need to write a method to update state?</summary>
<p><strong>
In the component that owns the state. 
</strong></p>
</details>

## Steps for click events - no kids

Yesterday, we already saw a rudimentary form of event handling in the Updating State lesson.

The steps to make 'logout' work would be reasonably easy if our entire App was only builtins in one `<App>` component:
1. You write a method like `handleLogout()` which uses setState to change the state, eg., `this.setState({name: ""})`
2. You do `<button onClick={() => handleLogout()}>Logout</button>` in your JSX. 
3. When your user clicks the button, the state (eg., name) changes. Easy.

#### The problem with children

Everything is harder when you have children. When children components get involved, you need an additional step of passing `handleClick()` down to the child.

## Steps for click events - with children

In our case, our button is in a child component `<UserLogOut>` but the state is in the parent (eg., `<App>`), so the steps will be more like:
1. In `<App>`, which holds our state, you still write a method like `handleLogout()` which uses setState to change the state, eg., `this.setState({name: ""})`
2. We pass the handleLogout method down from the parent `<App>` to child `<UserLogout>` as props, like `<UserLogout handleLogout={this.handleLogout}>`
3. In `UserLogout.jsx`, since this `handleLogout` method exists only in the parent, and UserLogout receiving it as props, we'll have to do `<button onClick={() => props.handleLogout()}>Logout</button>`. 
4. So when the user clicks logout, the parent's state changes.

#### We do: Defining a Method for Event Handling

Let's continue working with the `<UserLogout>` with the intention of updating the `name` in state to "" when someone clicks logout...

<details>
	<summary> What component owns the <code>name</code> state property?</summary>
<p>
<code>&lt;App /&gt;</code>
</p>
</details>

<details>
	<summary>Where are we going to have to put the method that calls <code>setState()</code> to change the value of <code>name</code> to ""?</summary>
<p><strong>
Within <code>&lt;App /&gt;</code>, of course!
</strong></p>
</details>

#### Step 1: Start by defining a method in `<App>` that calls setState:

```js
// This is a method to set the name state to "-"
handleLogout = (param1, param2) => {
  this.setState({name: "-"});
}
	
render() {
  ...etc...
```

Note that:
1. It's not a bad idea to start the name of event handler methods with the word `handle`, e.g., `handleSomeInteraction`
2. It's not actually necessary to put in `(param1, param2)=>`. You could just put in `() =>`. We're doing this to show you how you might write a handler method that does use its parameters to, eg., setState to an incoming parameter value.

<details>
	<summary><strong>Why are we using what appears to be an arrow function for handleLogout?</strong></summary>
<p>
<code>
Technically, this isn't even an arrow function, it's javascript's property Initializer Syntax which allows properties to be written within the body of a class. This looks really similar to how methods are defined.

We use a property to hold an arrow function because in a normal method, 'this' would refer to the function but we want 'this' to refer to the App class

Basically, this saves us having to bind "this" and have a constructor and avoid a lot of extra syntax.
</code>
</p>
</details>

#### Step 2: Pass the Handler to the Child

We need to be able to invoke the `handleLogout` method that lives in `<App>`, from the `<UserLogOut>` component.

Just like passing other expressions, we can give `<UserLogOut>` a **reference** to the method via props!

Update **App.js**'s JSX from:

```html
<UserLogOut name={this.state.name} email={this.state.email} />
```

to:

```html
<UserLogOut handleLogout={this.handleLogout} name={this.state.name} email={this.state.email} />
```

> As usual, we access methods and properties on a class component via `this`.

Now, `<UserLogOut>` will have access to the `handleLogout` method via `props.handleLogout`.

#### Step 3: The child calls props.handleLogout

Now, inside of `<UserLogOut>` we can replace `onClick={() => alert('cardi B is logging out!')}` with `props.handleLogout` as below:

```js
function UserLogOut(props) {
  return (
      <div className='UserLogOut'>
        Name: {props.name}<br />
        Email: {props.email}<br />
        {/* update this line! */}
        <button onClick={() => props.handleLogout(param1, param2)}>Logout</button>
      </div>
  );
}
```

You should now see the name change when a color is clicked!

Can it really be this easy? Yes.

Notes: 
1. We got lucky in that `<UserLogOut>` is a direct child of `<App>`. However, this often won't be the case, so, **what would we have to do?**
2. Again, we didn't need to do `props.handleLogout(param1, param2)`. We could just have done `props.handleLogout()` but we wanted to show you how to throw a parameter into the handler function maybe setState to a specific value the child wants.

#### Providing Arguments to Methods

We often need to pass arguments to method calls. In regards to logging out, we didn't really need to. Let's have you try it!

## You do: Checkout should show Paid:"yes"
1. Using the 3 steps above, make it so clicking the 'checkout' button changes the `isPaid` property in state from "no" to "yes"
2. (optional) (hard) Make it so that clicking the 'add' button on a food changes the `lineItems` property in state to insert the food you clicked on. Some notes:
	- Just like step 1 above, you'll define a handler method - but maybe just make it do an alert for now
	- Then, just like steps 2 and 3 above, you'll pass it down to where it's needed, and attach it to an onClick event attached to your "add" button
	- As a parameter in your `onClick={()=>myClickFunction(parameter)}`, you should probably pass in the name of the item they are clicking on, so that the handler method defined in step 1 can then take that parameter and add it to the array
	- `lineItems` is an array, and we're not allowed to mutate state directly, so in your handle method, you have to make a copy, eg., `tempItems = [...lineItems]` will copy it into a new array called `tempItems`
	- You can then add stuff to it., eg., `tempItems.push( ...the food...)`
	- You can then do `setState({ lineItems: temp })`
3. (optional) (really hard) Make it so that clicking the `+` or `-` button on a shopping cart item changes the quantity in state.

Time-permitting, we may look at the answers for 2 and 3.

## Summary

Writing event handler code can be challenging and error prone until you get used to it.

If things aren't working, be sure to verify the value of `this` and closely read the error messages.

Use React Developer Tools to check that methods, etc. are being passed correctly via props.



## ❓ Essential Questions

Take a minute to review the following questions:

1. **Which of the following would correctly handle a user selecting a new option in a `<select>` component?**

	```js
	<select value={this.state.choice} onChange={() => this.handleChange()}>
	```
	or
	
	```js
	<select value={this.state.choice} onchange={() => this.handleChange()}>
	```

2. **How does a nested component obtain a reference to an ancestor component's methods?**

3. **Is this code bogus or cool? Explain your answer.**

	```js
	<button onClick={ this.handleClick(5) }>Click Me!</button>
	```

## Further Study - The Synthetic Event Object

#### The Synthetic Event Object

You've seen how event handlers are automatically passed an event object as an argument. In a React app however, this event object is a React [`SyntheticEvent`](https://facebook.github.io/react/docs/events.html) that wraps the browser's native event object.

React does this because React has its own event system that:

- Handles lingering browser incompatibilities.
- Improves performance by implementing a single delegated event handler for all events.

Luckily though, React's event system is transparent to us - we don't need to know the nitty gritty details. 

More importantly, the API of the Synthetic Event object is identical to the browser's, which means we can still invoke `preventDefault()`, `stopPropagation()`, access `target` & `clientX` properties, etc.

## References

[Synthetic Events](https://facebook.github.io/react/docs/events.html)
