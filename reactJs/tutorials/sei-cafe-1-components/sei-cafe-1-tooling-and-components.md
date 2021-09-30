<img src="https://i.imgur.com/fx2orT2.png">

# Components in React
---

## Learning Objectives

| Students Will Be Able To: |
|---| 
| Design a UI using components |
| Define "presentational" (stateless) components as Function Components |
| Define "container" (stateful) components as Class Components |

## Roadmap

- "Component Thought"
- Review of Built-in vs. User-defined Components
- Categorizing Components as **Presentational (Stateless)** or **Container (Stateful)** Components
- Start a New React App - `sei-cafe`
- A React Development Approach
- Defining **Presentational** Components as Function Components
- Defining Components as Classes

## "Component Thought"

Components have become the fundamental building block of UIs created using modern-day front-end libraries/frameworks such as React, Angular, Vue, etc.

To develop a React application, we construct the UI with a hierarchy of components.

For example, take the following wireframe:

<img src="https://i.imgur.com/hL1T2tH.png">

The above wireframe could be broken into the following components:

<img src="https://i.imgur.com/TqerRDf.png">

We must get used to thinking about our UI in terms of components. This "Component Thought" requires us to:

- Build several small components to make the code more manageable.
- Compose (combine) these components into other components.
- Compose an entire "screen", or "page", using a hierarchy of components.
- Use client-side routing to render the "screens" according to which route is active.

Although most SPAs implement their functionality with multiple routes and "screens", until we learn about routing in React, we will concern ourselves with building only a single screen/page.

## Review of Built-in vs. User-defined Components

#### Built-in Components (React Elements)

As we've seen, React has several built-in components, such as `<input />`, that map to HTML elements. These built-in components are the only components that actually emit DOM elements in the browser document. These components are often called **React Elements**.

<details>
<summary>Syntactically, what distinguishes a built-in component from our user-defined components?</summary>
<p><strong>
React components are lower-cased, for example "&lt;div&gt;".
</strong></p>
</details>

#### User-defined Components

Our user-defined "custom" components may consist of any combination of other user-defined components and/or React Elements.

The name of our user-defined components must be capitalized.

<details>
<summary>Think for a moment: As we compose our app's UI with our custom components,  ultimately, no UI, no DOM elements, will be rendered in the browser window unless our components include what?</summary>
<p><strong>
React Elements like "&lt;div&gt;" - HTML is what the browser knows and loves.
</strong></p>
</details>

## Categorizing Components as _Presentational_ (stateless) or _Container_ (stateful) Components

#### State - A Quick Overview

Most applications manipulate and display information/data.

<details>
<summary>What single word have we been using to describe this information/data?</summary>
<p><strong>
State
</strong></p>
</details>

In a React app, state might also refer to data properties used to represent the "status" of a process or UI state. For example `state.isLoading` or `state.showDetails`.

#### Where State is Held Matters

Later today, you will learn about how **state** is held in certain components and passed to their child components via what's known as **props**.

How do we know which components _should_ have state or just props? That's what we're going to discuss next...

#### Two Categories of Components

To build better UIs with components, experts like Dan Abramov within the React community have established guidelines to separate components into one of two different categories:

- **Container (Stateful) components**
- **Presentational components**

#### Characteristics of _Container (Stateful)_ Components

- Hold state that pertains to the application.
- Typically pass state and callback methods to presentational components.
- May need to use lifecycle methods to fetch data from the server, etc.

#### Characteristics of _Presentational_ Components

- Primarily responsible for visualizing information. 
- Receive state and callback methods via props.
- Are highly reusable because they don't hold application state.

<details>
<summary>In a typical React app, will there be more presentational or container components?</summary>
<p><strong>
A React app will have more presentational components than container components.
</strong></p>
</details>

## Let's Begin Building SEI CAFE - _"Wondrous food and good company"_

This unit's reference app is a MERN-Stack online food ordering app

SEI CAFE is going to be a full-stack app with CRUD on the backend and even advanced authentication! In reality, there's no better way to learn about React than by developing a fullstack MERN app - which is what we're going to do this week and next!

Let's check out what we're going to build [here](https://sei-cafe.herokuapp.com/).

Be sure to sign-up:

<img src="https://i.imgur.com/ShSz0xE.png">

and place a couple of orders!

<img src="https://user-images.githubusercontent.com/24878576/114287518-626a2600-9a35-11eb-8674-d58a02fcb73f.png">

<img src="https://i.imgur.com/ZSsDUqk.png">


### 1. Generate the App

The **best** way to create a React project is neither repl.it nor codesandbox, but rather by using the `create-react-app` tool.

Let's do this! `cd` into this lesson's `student` folder, and run this command:

```
$ npx create-react-app sei-cafe
```

(If this gives you errors, you can try `npx create-react-app@latest sei-cafe` instead. Npm v7+ may require you to set an obscure paramter as well: `npm config set legacy-peer-deps true`)

> Note: A new folder will be created named **sei-cafe**. If you would like to generate a project in the future within an existing folder, you can use `.` in place of the project name.

Creating a new React app takes some time because `create-react-app` also installs the Node modules - and there's a ton of them!

Let's briefly review the outputted message:

```
Created git commit.

Success! Created sei-cafe at /Users/<your username>/code/sei-cafe
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd sei-cafe
  npm start

Happy hacking!
```

Now we can:

1. `cd sei-cafe`
2. Open the project in VS Code: `$ code .`
3. Open an integrated terminal in VS Code:  `control + backtick`
4. Spin up React's built-in development server: `npm start`, which will also automatically open the app in a browser tab:

    <img src="https://i.imgur.com/4ouH8bS.png" height="400">


The React development server automatically builds and reloads the app in the browser whenever changes are saved. This is what we mean by **tooling**.

Within VS Code, we'll find a Node project's usual **package.json**, **node_modules**, etc.

The React project's source code lives within the **src** folder:

<img src="https://i.imgur.com/d9T3Vqw.png" height="400">

The React development server automatically builds and reloads the app in the browser whenever changes are saved. This is what we mean by **tooling**.

### 2. Build index.html (Optional - Can skip)

Don't be fooled into thinking we're writing backend code yet just because we're using npm and nodejs, and we have a terminal. All of our react code is going to wind up in a single file called **index.html**, within some `<script></script>` tags. So any react code we write will be in this **index.html** which will run in a browser. React is frontend!

<img src="https://i.imgur.com/m87p4kN.png" height="400">

As part of our **tooling**, the create-react-app command gives us the build script which can take all of our react code, components, and static files, and generate a "build" folder which contains a production-ready **index.html** file. We can take a brief tangent to just try this build script by running "npm run build".

and verify that the build/ folder has been generated, and contains an index.html file that contains our React code. Open it up and check it out!

In a future lesson, in order to deliver this file to our users, we will need to setup an express server. For today, though, we will just work within the development environment. 

### 3. Ready the App for the Exercise

Not long ago, `create-react-app` generated the `<App>` component in **App.js** as a class.  However, it now uses a Function Component.

Function Components are "lighter weight", and with the recent addition of [hooks](https://reactjs.org/docs/hooks-intro.html), they can now manage state and handle a component's lifecycle like Class Components.

However, 90% of the React code out there uses **Class Components** to manage state thus we will as well until we cover hooks later.

Let's modify **App.js** line-by-line, converting it to a Class Component and so that just a `<header>` is rendered:

```js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">SEI-Cafe</header>
      </div>
    );
  }
}

export default App;
```

Notice that the `App` class extends from `Component`, which is a _named import_ from the `react` module. You could also just import `React` and extend from `React.Component`.

Now let's clean up **App.css** also. Replace everything with the following:

```css
.App {
  text-align: center;
}

.App-header {
  background-color: #222;
  height: 50px;
  padding: 20px;
  color: white;
  font-size: 40px;
  text-align: center;
}
```

#### Key Class/Function Differences

Differences you need to be aware of between Function Components and Class Components are:

- Function Components return their JSX from the function; whereas Class Components **must** define a `render` method that returns the JSX.
- You access props in a Class Component as `this.props` instead of just `props`, which is the name of the parameter commonly used when defining Function Components.

## Identifying SEI-CAFE's Components

#### Start a Wireframe

It's a common practice to start with a wireframe and identify the components by "outlining" and naming them.

Identifying a UI's components, like much of programming, is part art.  Therefore, the final component hierarchy can vary.

Because we already have the final version of the app available we can  use the following screenshot as a hi-fidelity wireframe. We'll start with the "new order" page for now, since we will not be looking at how to create "pages" until we discuss React Router:

<img src="https://user-images.githubusercontent.com/24878576/114287518-626a2600-9a35-11eb-8674-d58a02fcb73f.png">

#### Outline and Name Components

<img src="https://user-images.githubusercontent.com/24878576/114308236-22e11f80-9ab1-11eb-86a2-4e95b8450084.png">

As you can see, we've identified the following components. Some have children. Some are user-defined, and some are builtin:

- `<App>`
	- `<nav>`
		- `<Logo>`
		- `<CategoryList>` (will be comprised of a list `<li></li>` of categories like desserts)
		- `<Link>` (in react, we use Link instead of `<a>`: see "React Router" lesson)
		- `<UserLogout>`
	- `<MenuList>`
		- `<MenuListItem>` (we might use more than one of these)
	- `<OrderDetail>`
		- `<div>` (for the top)
		- `<div>` (for the list of foods in the order)

For clarity, this isn't 100% complete as some of the user-defined components need to further be broken down into their builtins - eg., MenuListItem might be made up of some `<span>` and `<img>` builtins.

Until we discuss links and pages and react router, we'll be ignoring the **Previous Orders** "button" which is actually just a link (`<a>`) that routes to the orders/ page - we'll be adding it in the react router lesson.

## ❓ Review

Note that the `<nav>` and `<div>` components are lower-cased - **why?**

## A React Development Approach

We all know how challenging it can be to get started developing an app.

There's a great guide in React's Main Concepts section called [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) - much of this lesson is based upon this guide.

Here's a common approach to coding a React app:

1. Identify potential components (like we did above).
2. Build skeleton components that mock up the UI.
3. Identify the application's data-model (state). **State is the single-source of truth** in an application!
5. Initially, put state in top-level **container** components, i.e. `<App>`.
6. Add layout CSS to components (including "wrapper" built-in components such as `<div>`s) as needed to properly layout/group other components.

In the next lesson we'll focus on the data model (state) that our website requires.

But today we will start with defining our components...

## Defining **Presentational** Components as Function Components

### Disclaimer

Hooks now allow state, lifecycle methods (side effects), etc., to be implemented in Function Components.

However, as we initially learn about React and draw comparisons between Class and Function Components, we are going to set aside the addition of hooks which were added recently with version 16.8.0 of React.

### What Are They?

**Function Components** were introduced in version 0.14 of React (current version is 16.13 - yes, they changed their versioning scheme).

Function Components provide a simpler syntax vs. defining components using classes.

Since most of the components you write will be presentational, Function Components will be your "go to" syntax unless that component will be a "container" (stateful) component that has some sort of state.

Function Components take props as an argument and returns the UI, defined as JSX.

## components step 1- define (function or class)
Function components can be defined as function declarations, traditional function expressions or as arrow function expressions. A simple component that doesn't use any props might be defined like this:

```js
// Function declaration
function ConcertCard(props) {
  return (
    <div className='concert-card'>
      <h3>Title: CARDI B LIVE</h3>
      <h2>Venue: Air Canada Centre</h2>
    </div>
  );
}
```

#### Alternate syntax (arrow functions)

Below is an example of a component that relies on props. We'll talk more about the props aspect later, but the key point here is that we can use arrow functions to define components too:

```js
// Arrow function with implicit return:
const ConcertCard = (props) => (
  <div className='concert-card'>
    <h3>{props.concert.title}</h3>
    <Performers performers={props.concert.performers} />
    <Venue venue={props.concert.venue} />
  </div>
);
```

#### Class component syntax

Function Components are functionally equivalent to Class Components when the class only defines a `render` method.  For example, the equivalent Class Component for the above `<ConcertCard>` component would be:

```js
class ConcertCard extends React.Component {
  render() {
    return (
      <div className='concert-card'>
        <h3>Title: CARDI B LIVE</h3>
        <h2>Venue: Air Canada Centre</h2>
      </div>
    );
  }
}
```



## components step 2- make it show up / use it:

Regardless of what syntax you use to define a component, to make it show up, you can use this syntax:

If the component isn't relying on props, the syntax to make a component show up is simpler:
```
<ConcertCard />
```

If a component relies on some props, to make it show up, you might do something like this. Here we're providing a "concert" prop which you can ignore for now. Again, we'll talk more about props later:

```
<ConcertCard concert={concertObject} />
```

You usually make a component show up (as many times as you want) by putting it into the return() of its parent component, for example:
```js
class App extends React.Component {
  render() {
    return (
      <div>
      	<ConcertCard />
	<ConcertCard />
      </div>
    );
  }
}
```



### Write Our First SEI CAFE Component

We typically start coding the components higher in the hierarchy first, and work our way down.

Let's choose the `<MenuList />` component on our wireframe as a place to start since it will let us practice defining UserDefined components with child UserDefined components - so let's:

1. Create a **components** folder within the **src** folder. All our new components will go inside this new folder.
2. Create a **MenuList** folder within the **components** folder. This is a best practice that allows you to organize a component's module file with other files used by that component (primarily CSS files and tests).
3. Create a **MenuList.jsx** module within the **MenuList** folder.  **MenuList.js** will also work but may not get JSX-related completion from editors like VSCode.  Note that the name of the module file is always the same as the component, including the UpperCamelCasing.
4. Now, let's do <strong>step 1 - Define the component!</strong> Add the following code to **MenuList.jsx**:

	```jsx
	// When using JSX, React must be in scope
	import React from 'react';
	
	function MenuList(props) {
      return (
          <div>
            MenuList
          </div>
      );
  	}

	export default MenuList;
	```
	
5. Now, <strong>step 2 - Make the component show up!</strong> Update **App.js** to:

	```js
	import React, { Component } from 'react';
	import './App.css';
	// Must import components used in the JSX
	import MenuList from './components/MenuList/MenuList';
	
	class App extends Component {
	  render() {
	    return (
	      <div className="App">
	        <header className="App-header">SEI-Cafe</header>
            <MenuList />
            <MenuList />
	      </div>
	    );
	  }
	}
	
	export default App;
	```

### Oops. 

I made it show up two times. Can you make the component just show up once?

Looking good.  However, as you build out the rest of the components for this lesson, it would be cool to see a border surrounding each `<div>` that you render for each of the components.
	
Let's define a "temporary" CSS class named `component` in **index.css** that will "outline" any element that contains the **component** class:

```css
.component {
  border: 2px dotted red;
  margin: 4px;
  padding: 4px;
}
```

Next, add the **component** CSS class to the `<div>` in the `<MenuList>` component like this:

```js
function MenuList(props) {
      return (
          <div className='component'>
            MenuList
    ...etc...
```

Now you'll be able to easily identify the component hierarchy as you create the skeleton components we identified earlier.

<img src="https://user-images.githubusercontent.com/24878576/114311766-04355580-9abe-11eb-9371-503b1f95f545.png">

#### YOU DO: Write Another Component as a Function Component (5 mins):

Now it's your turn to code another top-level component using our wireframe: 
<img src="https://user-images.githubusercontent.com/24878576/114308236-22e11f80-9ab1-11eb-86a2-4e95b8450084.png" height="400">

Since we're going top-down, code the skeleton of the `<OrderDetail>` as a function component, putting it in its own folder, exporting, importing, etc., just like `<MenuList>`.

Don't copy your other code - for this exercise you should type everything out.

For now, let's not worry about layout.

Don't forget to add the **component** CSS class to the outer React Element.

Add `<OrderDetail>` to `<App>` and the display should look like this:

<img src="https://user-images.githubusercontent.com/24878576/114312610-33999180-9ac1-11eb-947e-e61d835732f3.png">

## Defining Components as Classes

Both **presentational** and **container** components _could_ be written as JS classes, however, presentational components are typically written as functions.

However, any component that has its own state or needs to tap into the component's lifecycle methods (next week), must be defined as a class. 

Let's examine the `<App>` component to see how a class is used to define a component.

Some observations:

1. This is a very simple component that currently does not hold any state, etc.
2. The only method is `render`. This is the only method that must be defined in a class component.
3. A class component can use a `constructor` method to initialize the component's state.
4. Because there's no state, there's no other methods defined, such as click event handlers, used to update state.
5. The first line is using ES2015's `import` statement to import functionality from the `react` module. The `React` object is the _default export_ and `Component` is a class that's exported as a _named export_. Note that a JS module can have only one _default export_ but as many _named exports_ as desired.
6. Components, whether defined as a class or a function, are usually the default export of the component's module.

You'll be working with Class Components this afternoon when you start working with state.


## YOU DO: Define the Remaining Components for SEI Cafe

Build out the remaining components for the SEI CAFE app based on the components identified earlier:
- `<App>`
	- `<nav>`
		- `<Logo>`
		- `<CategoryList>` (will be comprised of a list `<li></li>` of categories like desserts)
		- `<Link>` (in react, we use Link instead of `<a>`: see "React Router" lesson)
		- `<UserLogout>`
	- `<MenuList>`
		- `<MenuListItem>` (we might use more than one of these)
	- `<OrderDetail>`
		- `<div>` (for the top)
		- `<div>` (for the list of foods in the order)

The components can be defined as function components or class components. You will not have to define a component for `<nav>`. As nav is a builtin, you could do something like this:

```html
class App extends Component {
  render() {
    return (
      <div className="component">
        <nav className="component">
            nav
            <Logo />
            <CategoryList />
            <UserLogOut />
        </nav>
        ...etc...
```

Be sure to render the components in a hierarchy that results in a display looking something like this:

<img src="https://user-images.githubusercontent.com/24878576/114315251-1a4a1280-9acc-11eb-99e3-eef449a5681e.png">

> Note that in the example, there are 2 `<MenuListItem>` components being rendered within `<MenuList>`.

#### Bonus - Basic Layout

As a bonus challenge, use CSS flexbox and/or grid to rearrange the components into a basic layout as follows:

<img src="https://user-images.githubusercontent.com/24878576/114315427-f4713d80-9acc-11eb-83e0-bb19232cac42.png">

As a hint, I added in the following extra lines into index.css (although this technically isn't the best way to work with css in react):
```css

.component {
  border: 2px dotted red;
  margin: 4px;
  padding: 4px;
}

#root {
  height: 100%;
}

.App {
  height: 100%;
  display: grid;
  grid-template-columns: 1.6fr 3.5fr 3fr;
  grid-template-rows: 1fr;
  background-color: #ffffff;
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.MenuList {
  background-color: var(--tan-1);
  border: .1vmin solid var(--tan-3);
  border-radius: 2vmin;
  margin: 3vmin 0;
  padding: 3vmin;
  overflow-y: scroll;
}

.OrderDetail {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 3vmin;
  font-size: 2vmin;
  color: var(--text-light);
}
```

## ❓ Essential Questions

1. **A UI in React is a hierarchy of ____________.**

2. **In React, components can be defined as JS classes or JS _________**.

3. **True or False: Most components are "presentational" components designed to render data.**

4. **Unless using the newer "hooks" approach, "container" components that hold state must be defined as JS _________.**

## References

[React Docs - Components & Props](https://facebook.github.io/react/docs/components-and-props.html)

[Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)


