<img src="https://i.imgur.com/r8sIGie.jpg">

# Styling React Components
---

## Learning Objectives

| Students Will Be Able To: |
|---|
| Include external CSS frameworks |
| Style components using imported CSS |
| Style components using CSS Modules |
| Style components using inline styling |
| Use Flexbox for basic layouts |

## Roadmap

- Set Up
- Overview of Styling in React
- The Starter Code
- Adding External CSS Frameworks to a React App
- Importing CSS Stylesheets
- Importing CSS Modules
- Inline Styling With JavaScript
- CSS Stylesheets or Inline Styling?
- Essential Questions

## Set Up

To get set up for this lesson:

- `cd` into the `student` folder for this lesson.
- Open the project in VS Code: `$ code .`
- Open a terminal in VS Code (`ctrl + backtick`)
- Install the Node modules: `$ npm i`
- `npm start` to start the frontend development environment

## Overview of Styling in React

Like many things React, styling is done a little differently than what we've become accustomed to.

For example, when learning CSS we were told that inline styling should be avoided. Well, React actually encourages inline styling!

#### Options for Styling React Components

Today, we will look at a few of the more popular ways to style the components that comprise a React UI:

0. **Adding External CSS Frameworks to a React App**: We can import bootstrap via CDN or MaterialUI via an npm package

1. **Using CSS Stylesheets**: This is the approach that `create-react-app` uses with its `<App>` component.

2. **Using CSS Modules**: Similar to above, but different in a significant way.

3. **Using Inline Styling**: This approach uses the `style` prop.

## The Starter Code

It's the SEI CAFE app from where we left off in the _React State and Props_ lesson with a few additions.


In this lesson we will to apply the above styling approaches to sei-cafe.
## 0. Adding External CSS Frameworks to a React App - Bootstrap, MaterialUI

#### Loading Via CDN

If you want to use third-party CSS frameworks like Bootstrap, Materialize, etc., feel free to continue to link in the CDNs (both CSS and JS) as usual.

We don't really need Bootstrap for SEI CAFE, but we'll use its button styles just to check out how to use CDNs in a React app.

You will find the **index.html** in the **public** folder. Let's import bootstrap:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	<!-- ADD THIS LINE BELOW TO IMPORT BOOTSTRAP FROM A CDN -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <title>SEI CAFE</title>
  </head>
```

Let's change the `<title>` while we're at it!

Sometimes, you will immediately visually see that Bootstrap is loaded because your existing styling will be now messed up due to Bootstrap setting, for example, the CSS `box-sizing` property to `border-box` instead of the default of `content-box`.


#### Using the Classes

With the Bootstrap framework now loaded, all of the classes it defines are available for use.

In React, we use the `className` prop to set class(es) on React Elements (`<div>`, `<p>`, etc.).

If you inspect the elements in DevTools, you'll see that the `className` prop does indeed result in a `class` attribute being added to the DOM element.

**KEY POINT**: Note that **we can only style React's built-in** HTML/DOM components (lowercase-named components). This is because they are the only components that actually get rendered to the DOM.


#### Loading Via NPM Packages

Using CDNs is a good way to go, however, chances are your framework of choice is available as an NPM package also, and many frameworks such as Material UI recommend you take this approach.

Look [here](https://material-ui.com/getting-started/installation/#npm) if you'd like to install MaterialUI via an an npm package.
Look [here](https://www.npmjs.com/package/bootstrap) if you'd like to install Bootstrap via an an npm package.

As a final note regarding external CSS frameworks, due to the popularity of React, component libraries that encapsulate a framework's styling into custom React components are available. Knowing how much you love Bootstrap, here's a [link to React-Bootstrap](https://react-bootstrap.github.io/).

For example, MaterialUI has a whole list of components you can just plug in, eg.,
<a href="https://material-ui.com/components/bottom-navigation/">a navbar</a>, loading spinners, etc..


Using too many of these can sometimes enlarge your **bundle.js** and other static assets, increasing both load-time and bandwidth usage.

#### 💪 Practice Exercise (optional)

Try adding some bootstrap classes to some of your components, for example but not limited to:

- `container` class.
- `btn` & `btn-default` classes. 

Or try adding some materialUI 
<a href="https://material-ui.com/components/lists/">components</a>.

#### NOTE: Global Styling in React

There's a **src/index.css** file in the React project.

This is a great place to put "global" or application-wide styling.

You can see that it already has a couple of rules in there that can be applied to **everything in your entire app**.

## 1. Importing CSS Stylesheets

#### Benefits of Importing CSS Stylesheets

- You already know how to use them.

- Great for better organizing CSS rules, usually grouping styles that pertain to a particular component.

- Loaded once, and optimized by the browser.

#### Implementation

- When importing styles for a component:
	- The file is typically named the same as the component (**LineItem.css** for a **LineItem.jsx** component).
	- That CSS file would then be imported into the component's module.

- Importing CSS files require tooling. In a React app started with the `create-react-app` CLI, Webpack has been configured to process and import CSS stylesheets.

- Importing the same module multiple times does not increase the size of the built code - Webpack will only include the module once.

> **KEY POINT:** When we import a CSS stylesheet into a component as `create-react-app` did with **App.css**, those styles are actually merged into the application globally. This is just like when multiple external stylesheets are loaded in an _index.html_. So, it's important to prevent rules from conflicting and overriding each other.

#### Importance of Namespacing

CSS class names are like global variables, so it's a good idea to namespace them with the component's name to avoid _name collisions_.

Look at how `create-react-app` namespaced the classes used for the `<App>` component, for example, `App-header`. Following this practice in your own imported stylesheets is highly recommended.

As an alternative, we can use CSS Modules to avoid conflicts when naming classes. More on CSS Modules in a bit.

#### Import a Stylesheet

Currently the `<LineItem>` component is conspicuously missing its css.

Let's create and import a CSS stylesheet for `<LineItem>` so that we can style it:

1. Create a CSS stylesheet file named **components/LineItem/LineItem.css**.


2. `import` it in **LineItem.jsx** as follows:

	```js
	import './LineItem.css';
	```
	Be sure to include the `.css` file extension!

3. Create a class named `LineItem` within the new **LineItem.css** and look at how we style child elements:

```css
.LineItem {
    width: 100%;
    display: grid;
    grid-template-columns: 3vw 15.35vw 5.75vw 5.25vw;
    padding: 1vmin 0;
    color: var(--text-light);
    background-color: var(--white);
    border-top: .1vmin solid var(--tan-3);
    font-size: 1.5vw;
  }

.LineItem:last-child {
    border-bottom: .1vmin solid var(--tan-3);
}

.LineItem .qty {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3vw;
}

.LineItem .ext-price {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.3vw;
}

.LineItem button {
    margin: 0;
}
```

4. Finally, apply the `LineItem` class to the `<LineItem>` component's outer `<div>` **with the __________ prop**.

Yay. Now `<LineItem>` looks better! So that's the sort of recommended way to do things when using Create-React-App tooling.

#### ❓ Review Questions: Importing CSS Stylesheets

1. **True or False: Tooling is needed to import CSS stylesheets.**

2. **Where is the problem in the following two imported stylesheets:**

	```css
	/* CompA.css */
	
	.CompA-header {
		width: 100%;
	}
	
	button {
		background-color: red;
	}
	```
	
	```css
	/* CompB.css */
	
	.CompB-header {
		width: 50%;
	}
	
	button {
		background-color: blue;
	}
	```

## Importing CSS Modules

CSS Modules became available with the release of **create-react-app v2.0**, which improved the configuration of Webpack.

With **CSS Modules**, a CSS file's **class names** will be made unique by the tooling and will be dedicated to the component that imports the CSS Module - no more worrying about class name collisions!

Using a CSS Module differs from using a CSS stylesheet in three ways:

- The filename ends with `module.css`, e.g., `App.module.css` instead of `App.css`.

- The CSS Module is imported with the `from` syntax.

- **Class selectors** are unique to the component.  Other selectors however become global CSS rules just like with CSS stylesheets.

To check out CSS Modules, let's use one to style `<MenuList>`:

- Create a **MenuList.module.css** file within the **MenuList** folder.

- Now let's add our css:

	```css
	.div {
		background-color: var(--tan-1);
		border: .1vmin solid var(--tan-3);
		border-radius: 2vmin;
		margin: 3vmin 0;
		padding: 3vmin;
		overflow-y: scroll;
	}
	```
	Be sure to define the rule using a class selector (`.div`), not an element selector (`div`).

- Now let's update **MenuList.jsx** to use the CSS Module:

```js
import styles from './MenuList.module.css' // module import
import MenuListItem from '../MenuListItem/MenuListItem';

function MenuList(props) {
  return (
      <div className={styles.div}>
```

	
Note that the class names become keys on the `styles` object - let's console.log it to check it out:

```js
import styles from './MenuList.module.css';
console.log(styles); // add this for fun
```

Logging out `styles` reveals that the tooling has generated a unique class name in place of `.div`:


Okay, the button's sizing is better, but what if we want to also include other classes, like Bootstrap's `btn`?

Well, since `styles.div` is just a string, and `className={styles.div}` is just a JSX expression, we can use a template literal like so:

```html
<div className={`${styles.div} btn btn-default`}>
```

Yay!

#### ❓ Review Questions

1. **What's the difference when naming the files for CSS stylesheets vs. CSS Modules?**

2. **True or False: Importing CSS Modules results in an object where the keys are the names of the classes we defined in the module and the values are the unique class names generated by the tooling.**

3. **What's wrong with the following code:**

	```js
	import styles from './SmallComponent.module.css';
	
	function SmallComponent(props) {
	  return <div className='styles.small'>I'm Small</div>;
	}
	```

## Inline Styling With JavaScript

#### About Inline Styling

Contrary to what we've been told about avoiding styling elements inline using the `style` attribute in HTML, with React, inline styling is a common technique for **dynamic** styling!

Inline styling in React uses the `style` prop, however, unlike the `style` attribute in HTML, we assign a JS object instead of a string.

#### Adding Inline Styling to the `<LineItem>` Component

Let's apply some inline styling to the `<LineItem>` component. Change:

```js
 <div className="qty">
```

to:

```js
<div className="qty" style={{ justifyContent: 'center' }}>
```


Inline styling requires a JS object. As you can see, the JS objects we use for inline styling are just regular JS objects. Some rules:

- CSS property names are camelCased (eg., `style={baseStyle}`).

- Pixel values can be provided as integers instead of strings.

- Other units like the `50%`, or values like the `2px solid` must be a string.

Now let's apply the styling by assigning the `baseStyle` object to the `style` prop within a JS expression (within curly braces):

#### Advantages of Inline Styling

Here are some advantages of inline styling with JS objects:

1. Since it's just JS, you can compute the value of any CSS property dynamically - remember, a component and all of its nested components are re-rendered when any state or props change. Consider how nifty this would be for data visualization components where properties like width, height, top, left, etc. are computed dynamically.

2. Again, because it's just JS, we can assign any valid JS expression to the `style` prop like what we just did. Opportunities for the ternary operator abound! <br>For example, `<div style={{colour: props.currentColour ? 'black' : 'lightgrey'}} >`


## Import CSS or use Inline Styling?

Generally, styling components in a React app requires a blended approach:

- Use imported CSS stylesheets for "static" styling reused throughout the app, or when selectors beyond simple classes are needed.

- Use imported CSS Modules for defining CSS **classes** dedicated to a given component.

- Use inline styling to style a component dynamically as state and/or props change.

[This 35 minute video](https://www.youtube.com/watch?v=tkuxR-b9aTI) suggests that approximately 80% of your styling will be CSS-based with the remaining 20% inline.

Regardless of what you do, as always, keep your eyes open for new approaches. For example, [Styled Components](https://styled-components.com/) are interesting, however, they are certainly more complex than the other approaches.

Lastly, there are several open-sourced libraries that make inline styling more powerful. For example, it's not easy to style pseudo-classes, such as `:hover` inline. One of the more popular libraries is [Radium](https://github.com/FormidableLabs/radium).

## ❓ Essential Questions

Take a minute to review...

1. **What is the name of the prop used to style inline?**

2. **What data type is assigned to the above prop?**

3. **When using CSS Stylesheets, it's important that class names be _______.**

4. **What styling approach is best to use if you need to compute styles dynamically?**

## References

[Adding a CSS Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-stylesheet)

[Adding CSS Modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)

[A Visual Guide to CSS3 Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties?utm_content=bufferbb7b2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer#comments-section)






