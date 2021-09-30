# Connecting a Server and Database

Let's start with a bit of review.

### Review - What is a Single-Page App?

We've mentioned them previously - **what are they?**

<img src="https://i.imgur.com/m01TbLF.png">

In a traditional web app, if we click a link, submit data via a form, or type in the address bar and press [enter], **what happens?**

In a SPA, we still want to be able to access different functionality by clicking links, submitting data to the server, etc., however, we want the UI to update without triggering a full-page refresh.

There are three development concepts that make SPAs possible:

1. <strong>AJAX Communication between client and server</strong>
2. Client-Side Routing (using "react router" to simulate the idea of pages for the user)
3. Client-Side Rendering (React!)

### Review: AJAX

As you've seen, AJAX/`fetch` can be used to send HTTP requests to a server using JavaScript **instead of using forms and links in the page**.

With AJAX, the server responds to an HTTP request with an HTTP response in JSON format.

Again, the request is sent **via code**, and the browser has no reason to reload the page. No links were clicked.!

### AJAX + React:

So, assume a user clicks an **Add POST** button in a SPA and expects to see the new post show up in the list of posts... You don't want the button to cause a full-page refresh!

In SPAs, you would send an AJAX request containing the POST data to the server. 

The server would update the database and send back a response (probably containing the updated list of posts).

Then react changes the state to make the post render in the UI.


### ❓ Review Questions - SPAs

1. **What's the key difference between a traditional web app and a single-page app?**

2. **True or False: AJAX/Fetch is how React apps talk to the server.**

## Architecture of the MERN-Stack

The following depicts the overall architecture of a MERN-Stack app:

<img src="https://i.imgur.com/m87p4kN.png">

The MERN flow is as follows:

1. When the user browses to the app's URL, the Express server always delivers the static **public/index.html** page.

    > Note on the server, there are no EJS views.  In fact, there's no reason to install the EJS template engine.

2. After the **index.html** has been loaded, all subsequent HTTP communications between the client and server will be via AJAX in order to avoid the page from being reloaded.

3. On the server, a "catch-all" route will be defined with the purpose of delivering the static **index.html** file. We will refer to this route as the "catch all" route since it will match all `GET` requests that do not match any of the "API" routes.

4. Other than the single "catch all" route just mentioned, all other routes on the server will be defined to respond to AJAX requests with JSON. By convention, the endpoints of these routes with be prefaced with `/api`. 

### How to Structure a MERN-Stack Project

There are concerns in both **development and production** environments that have to be addressed.

#### During Development...

A React project uses a development server (ie., when you do `npm start`) running on `localhost:3000`.

<details>
<summary>There's a conflict between React's development server and the Express applications we've built previously - what is it?</summary>
<p><strong>They both run on port 3000 by default. Uh oh!</strong></p>
</details>

The solution:
	- We will run `npm start` on port 3000 (react dev server)
	- We will run `nodemon` on port 3001 (backend)
	- We will make react send GET and POST requests to 3001 (via a proxy)

This way, react can talk to our server while we develop. Yay.

#### Production Environment Concerns

As we develop our React app locally, we're writing source code that React's dev server builds and runs automatically.  However, this is not production ready code because it has extra debugging logic, etc.

In a moment will see how to **build** the React app locally, and generate a production **index.html** file to be served by the server.

#### MERN-Stack Project Structure

There are two general architectures we could pursue:

1. Maintain **two** separate projects, one for the React app, the other for the Express backend.
2. Integrate the codebase for both the React frontend and the Express backend.

A single project with both frontend + backend together is usually better. So we will start with a React app, then add an Express **server.js** and other server related folders/files as necessary. This approach results in a single **package.json** file and **node_modules** folder.

Let's take a look at the reference app we'll build together today...

## Let's Begin Building **msg-board**

Here's the plan:

1. Generate the React app
2. Build the React app's production code
3. Code the skeleton Express app
4. Define the "catch all" route
5. Test the Express server

Let's do this!

### 1. Generate the React App

The **best** way to create a React project is by using the `create-react-app` script provided by the React team:

```
cd ~/code
npx create-react-app msg-board
```

> Note: A new folder will be created named **msg-board**. If you would like to generate a project in the future within an existing folder, you can use `.` in place of the project name.

Creating a new React app takes some time because `create-react-app` also installs the Node modules - and there's a ton of them!

Let's briefly review the outputted message:

```
Created git commit.

Success! Created msg-board at /Users/<your username>/code/msg-board
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

  cd msg-board
  npm start

Happy hacking!
```

Now we can:

1. `cd msg-board`
2. Open the project in VS Code: `$ code .`
3. Open an integrated terminal in VS Code:  `control + backtick`
4. Spin up React's built-in development server: `npm start`, which will also automatically open the app in a browser tab:

    <img src="https://i.imgur.com/4ouH8bS.png" height="400">


The React development server automatically builds and reloads the app in the browser whenever changes are saved.

Within VS Code, we'll find a Node project's usual **package.json**, **node_modules**, etc.

The React project's source code lives within the **src** folder:

<img src="https://i.imgur.com/d9T3Vqw.png" height="400">

### 2. Building the React App's Production Code

We will soon be coding the Express server to serve the production **index.html** page. Thus, we need to build the React app's code locally into production code at least once so that the Express server does not raise an error.

The `create-react-app` CLI includes tooling and a **build** script in **package.json** that, when run, compiles the the code in the **src** and **public** folders of the React project into production code - placing it into a folder named **build**.

Let's run the build script:

```
npm run build
```

> Note: npm requires us to use the `run` command for scripts other than `start` and `test`.
 
After building, examining our project's structure reveals a new **build** folder containing production ready static assets including **index.html**, **static/css** & **static/js** folders, etc.

This **build** folder of production-ready goodness is ready to be served up by an Express backend...

### 3. Code the Skeleton Express App

Now with the React app up and running, we can start to code the Express backend.

We _could_ use Express generator if we save the existing React-oriented **package.json** file and merge it with the Express dependencies.

Instead we're going to code our own Express app from scratch because we won't need much middleware, etc. due to the fact that the Express backend simply needs to:

- Deliver the **production-ready** **index.html**, which will in turn request the **production-ready** scripts, etc.
- Respond to AJAX requests, performing any necessary CRUD, and finally respond with JSON.

#### Install the Modules for the Express Server

There's no problem with the Express project happily sharing that same **package.json** that `create-react-app` created.

For now, we're only going to install a minimal number of modules for the Express app:

```
npm i express morgan serve-favicon
```

> Again, we don't need a view engine because our server will be either serving static assets (index.html, CSS, JS, images, etc.) or responding to AJAX requests with JSON. There will be no EJS templates!

Later, we'll install additional modules, e.g., `mongoose`, `dotenv`, etc.

#### Create and Code the Express App (**server.js**)

Let's code our Express server:

1. Ensure that you're still in the root folder of the React project.

2. `touch server.js`

3. At the top of **server.js**, let's do all the familiar stuff: `require` the modules; create the Express app; and mount the `morgan` logging middleware and `express.json()` middleware that processes JSON data sent in the AJAX request and adds it to the `req.body`:

	```js
	const express = require('express');
	const path = require('path');
	const favicon = require('serve-favicon');
	const logger = require('morgan');
	
	const app = express();
	
	app.use(logger('dev'));
	app.use(express.json());
	```

	<details><summary>❓ Why don't we need to mount the <code>express.urlencoded()</code> middleware also?</summary><p><strong>Because <code>express.urlencoded</code> middleware is used to process data submitted by a form - and we don't submit forms in a SPA. We send AJAX POST requests.</strong></p></details>

4. Mount and configure the `serve-favicon` & `static` middleware so that they serve from the **build** (production) folder:

	```js
	app.use(express.json());
	
	// Configure both serve-favicon & static middleware
	// to serve from the production 'build' folder
	app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'build')));
	```

5. Set the port for backend development to use `3001` so that React's dev server can continue to use `3000` and finally, tell the Express app to listen for incoming requests:

	```js
	// Configure to use port 3001 instead of 3000 during
	// development to avoid collision with React's dev server
	const port = process.env.PORT || 3001;
	
	app.listen(port, function() {
	  console.log(`Express app running on port ${port}`)
	});
	```

### 4. Define the "Catch All" Route

A single "catch all" route is required to serve the **index.html** when any non-AJAX "API" request is received by the Express app:

```js
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```

> Note: Since this route is a "catch all" that matches every `GET` request, be sure to mount API or other routes before it!

Now the "catch all" route will serve the **index.html** whenever:

- A user types a path into the address bar and presses enter.
- The user refreshes the browser.
- An "external" link in an email, included on another web page, etc. to the MERN-Stack app is clicked.

For example, if we slack the following link to a friend: `https://sei-cafe.herokuapp.com/orders/new`. The friend clicks on it, initiating an HTTP request to our server.

However, the `/orders/new` part of the URL is supposed to be for the client router - not the server!  But there it is, and the server has to deal with it...

The server deals with it by, thanks to the "catch all" route, sending back  **index.html** - which is what we want.

After **index.html** loads in the browser, the React app's client-side routing will render components based upon the `/orders/new` path in the address bar.

### 5. Test the Express Server

We should now be able to test the Express server.

However, please note that we can no longer just type `nodemon` because just typing `nodemon` relies on the `start` script in **package.json** to know what to run and that script is being used to start the React dev server instead.

Therefore, in the MERN-Stack development environment, it's important to start the Express server by typing:

```
nodemon server
```

As expected, the Express server will run on port 3001 instead of 3000, which is where the React dev server runs.

Browsing to `localhost:3001` will display our React app!

### ❓ Review Questions - MERN-Stack Development

1. **Is the app we're currently viewing at `localhost:3001` the "production" version of the React app or the version within the `src` folder?**

2. **What command must be run to build the React app's production 'index.html'?**

## Configure React for MERN-stack Development

Note how we're viewing the React app without the React development server running - as we just discussed, this is because we are viewing the built production code, not the code as it exists in the **src** folder.

> **IMPORTANT**: During development, you don't want to browse to `localhost:3001`! Instead, you want the browser to load the React app from React's dev server on `localhost:3000`. You should only browse to `localhost:3001` to check out how the production code will run when deployed, however, don't forget to build before doing so.

So, when you are hacking out code and nothing seems to be updating in the browser - be sure to verify that you are browsing `localhost:3000`!

### Running Both Express & React During Development

To develop a MERN-Stack app, you'll need two **separate** terminal sessions for running:

1. The Express backend

2. React's development server

<details><summary>❓ If we don't already have the Express server running, we start it with what command?</summary>
<p>

```
nodemon server
```

</p>
</details>

<details><summary>❓ Now let's open a second terminal session and start React's dev server using what command?</summary>
<p>

```
npm start
```

</p>
</details>

Now, browse to `localhost:3000` - not `3001`!

So far, so good, but there's an problem lurking...

### Ensuring that the React Dev Server Sends AJAX Calls to the Express Server

Let's think ahead to when we begin to make AJAX requests from the React app to our server.

For react to talk to the server, we will be writing code like this:

```js
return fetch('/api/orders/history').then(res => res.json());
```

<details><summary>❓ Which host/server will that fetch request be sent to?</summary>
<p><strong>The same host as shown in the address bar: <code>localhost:3000</code></strong>
</p></details>

<details><summary>❓ Where do we actually need the fetch requests be sent to during development?</summary>
<p><strong>Our Express server that's listening for AJAX requests at <code>localhost:3001</code> !</strong>
</p></details>

BTW, this is only a problem **during development** - the deployed app will be just fine thanks to our chosen MERN-Stack structure that uses a single project for the frontend and backend.

Luckily, the React team has created an easy fix for this dilemma. The React development server allows us to configure a "proxy" which specifies the host to forward API/AJAX calls to.

The fix is to add a `"proxy"` key in the **TOP-LEVEL** of the **package.json**:

```
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:3001"
}
```

> Note: The React dev server will NOT automatically restart when changes are made to the package.json file.

Now **during development**, the React SPA can make AJAX calls, such as `fetch('/api/todos')`, and the request will be "proxied" (forwarded) to `localhost:3001` instead of `localhost:3000`. 

Informally, this means our react app (on 3000) can talk to our server (on 3001), even though they're running on different ports.

#### Welcome to the MERN-stack!

# Ok now for the Database...


## 1. Tidy Up the React App Generated by `create-react-app` (CRA)

Let's tidy up the generated React app by deleting some files we don't need at this time.

<details><summary>❓ Which JS file is the entry point of the React app?</summary>
<p>

**index.js**

</p>
</details> 

We're not going to be concerned with reporting the performance of this app, so we can optionally remove the `reportWebVitals()` call and the import.  Feel free to leave it if you wish and read the link for more info when you have time.

While in **index.js**, take note that it imports **index.css** which holds our application-wide styles.

Also as we learned, this is where the top-level `<App>` component is rendered from.  Let's tidy up **App.js** now...

### **App.js**

First, for better Emmet support and to stay consistent with the way we will name our future components, let's rename **App.js** to **App.jsx**.

> It may be necessary to restart React's Dev Server to get the app to compile.

Now in **App.jsx** we're going to:

- Refactor `<App>` into a class-based component
- Change the outer `<div>` to be a `<main>` React Element.
- Clear out all of the `<App>` components children.
- Add "App" as placeholder text.
- Remove the import of `logo`.
- Move the `export default` in front of the `function`

```jsx
import { Component } from 'react';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <main className="App">
        App
      </main>
    )
  }
}
```

> Note that the `import React from 'react';` is no longer necessary with the latest version of the library's JSX transform and build configuration.

Now we can remove the following unused files from the project:

- **App.test.js**
- **logo.svg**
- **reportWebVitals.js** (assuming you removed it from index.js)
- **setupTests.js**

Leave the **.eslintcache** file because it's an unavoidable part of the latest version of the CRA boilerplate.

### **public/index.html**

Let's not forget to update the `<title>` element in the `<head>` of **index.html**.

You'll find **index.html** in the **public** folder, along with a few other static assets such as **favicon.ico**.

Let's update the `<title>` element as follows:

```html
<title>MSG-BOARD</title>
```

## 2. Add Folders Used to Organize React Components

A typical React app has a high number of modules and we'll want to create a folder structure that best organizes these modules.

### Dedicated Component Folders

In React apps, it's a best practice to create a dedicated folder for each component.

Yes, this will result in quite a few folders, however, real-world React components often have dedicated CSS and test modules in addition to the module for the component itself - so it makes sense to keep these modules together in their own folder.

Let's create a folder for our only component at this time:

```
mkdir src/App
```

> The folder should be named **exactly** as that of the component - without the file extension, of course.

Now let's move the App related modules into the new **App** folder:

```
mv src/App.* src/App
```

The above move will require us to fix the import within **index.js**, which we'll do a bit later because we're not done organizing yet...

### Folders for Organizing Page level and Non-Page Components

Because of the high number of components in a typical React app, we'll create two additional folders to use as a further level of organization:

- **src/pages**: This folder will hold the page level components that implement the app's main functionality and are components that are rendered as the client-side route changes.  For example, in the past where we might have rendered a **movie-detail.ejs** template for a `GET /movies/:id` route, we now might want to render a **MovieDetailPage.jsx** component when at the `/movies/:id` client-side route instead. We'll put the `<App>` component in here as well.

- **src/components**: This folder will hold all other non-page level components. These components may often be used/rendered by any number of other components. 

Let's create the above two folders:

```
mkdir src/components src/pages
```

Now let's move the `<App>` component's folder into **src/pages**:

```
mv src/App src/pages
```

### Update the Import in **index.js**

The previous restructuring requires an update to the way **App.jsx** is being imported within **index.js**:

```jsx
// index.js

import App from './pages/App/App';
```

> Again, it may be necessary to restart React's Dev Server to get the app to compile.

## 3. Add Folders to Organize the Express Server Code

While we're creating folders used to organize our code, let's create some for the Express app that you're familiar with:

```
mkdir config routes models controllers
```

We'll be using the above folders to organize our server-side code soon enough.

Questions?

## 4. Implement `dotenv` Middleware and Create a **.env** File

As we've done in the past, we need a way to access environment variables and secrets. 

We're going to use the familiar `dotenv` middleware and **.env** file we used used in Unit 2 and is common in most Express apps.

### Install and Mount the `dotenv` Middleware

First the install:

```
npm i dotenv
```

Now let's add it to **server.js**:

```jsx
const logger = require('morgan');

// Always require and configure near the top 
require('dotenv').config();
```

### Create the **.env** File

Be sure to touch the **.env** file in the project root folder:

```
touch .env
```

Now we're setup to hold secrets such as the database connection string...

## 5. Install `mongoose` and Connect to a Database

As you'll remember, in Unit 2 we used the [Mongoose](https://mongoosejs.com/) library to interact with a MongoDB database.

Mongoose is also the go to in MERN-Stack apps.

First, we need to install it as usual:

```
npm i mongoose
```

### Create the **config/database.js** Module

Just like we did in Unit 2, we'll use a dedicated Node module to connect to the database:

```
touch config/database.js
```

Hopefully, this code looks somewhat familiar:

```js
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
```

### Add the `DATABASE_URL` to the **.env**:

For this app, we'll all connect to a cloud-hosted database:

```
DATABASE_URL=
```

> Be sure to change the connection string and the database name after starting a new project.

### Connect to the Database

We `require` **database.js** in **server.js** in order to connect to the database:

```js
require('dotenv').config();

// Connect to the database
require('./config/database');
```

> Be sure to require the config/database module after dotenv.

Looking good:

<img src="https://i.imgur.com/h9cuSsz.png">

## 6. Set up our Front-end

We're only going to need a couple components for this app, since there will only be a couple things being rendered:

1. A reusable component to display Posts
2. A sparse form to submit posts

Let's start with #1.

### Displaying Posts:

Let's start by creating the file for this component, while following the structure we've been working with.

> `mkdir src/components/Post`

> `touch src/components/Post/Post.jsx`

*Should this component be Functional or Class-based?*

```js
// components/Post/Post.jsx

export default function Post(props) {
    return(
        <div className="post">
            <p className="title">{props.post._id}</p>
            <p className="content">{props.post.content}</p>
        </div>
    )
}
```

That'll do for now. Let's turn our Attention to the Form component

> `mkdir src/components/Form`

> `touch src/components/Form/Form.jsx`

Since this form is going to handle issuing some POST requests, let's set it up as a class-based component so it can hold its own state.

```js
// components/Form/Form.jsx
import { Component } from 'react';

export default class Form extends Component {
  state = {
    content: ""
  };

  render() {
    return(
      <div>
        <textarea 
          name="content"
          onChange={this.handleChange}
          value={this.state.content}></textarea>
        <br/>
        <button onClick={this.handleSubmit}>Submit!</button>
      </div>
    )
  }
}
```

We're going to need to define that `handleChange` function to control the `textarea`s value, as well as the `handleSubmit` function to actually issue a POST request (we'll do that later though). 

### _*How can we use object destructuring to accomplish this in one line?*_

```js
handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
}
```

Now, time for our `App`. This component will be responsible for fetching posts from our database, and setting them to state. We'll write one function (on one line too!) that will accomplish this that we can pass down through our other components. This way, if we called that function from any other component, it will execute at the `App` level, causing all other components to re-render with fresh posts!

```js
// pages/App/App.js
class App extends Component {
  state = {
    posts: []
  }

  getPosts = async () => {
    await fetch("/api").then((res) => res.json()).then(data => this.setState({posts: data}))
  }

  render() {
    return (
      <div className="App">
        <Form />
      </div>
    );
  }
}

export default App;
```

If only there was a way to have that function run once all components have been successfully mounted. Enter `componentDidMount`! We'll talk in depth about these "Component Lifecycle Methods" next week. `componentDidMount` runs **once** when your component is mounted. So it's a good place to do your initial database fetching. Let's call our `getPosts` function when the component has been mounted. Finally, let's add some code to map over the posts, and render them. 

```js
// pages/App/App.js
...

componentDidMount() {
  this.getPosts()
}

render() {
    return (
      <div className="App">
        {this.state.posts.length ? 
          this.state.posts.map(p => (
            <Post 
              post={p}
              getPosts={this.getPosts}
            />
          ))
            :
          <h1>No Posts</h1>
        }
        <Form
          getPosts={this.getPosts}
        />
      </div>
    );
  }
```

> Take note of the ternary operator checking `this.state.posts.length`. This is something you will see in React apps that prevents everything from crashing if our data takes a long time returning from our database. 

Voila! We now have some posts coming back from our database! Now let's get to actually writing new posts. 

## 7. Finish up our Back-end

Now that we have our server up and running, and it's successfully connecting to our database, let's put it to work. This is what we'll be making today:

<img src="https://i.imgur.com/t1sVyCl.png">

### Models:

This app will be pretty slim in terms of models, so we'll go ahead and copy them in.

`touch models/Post.js`

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: { type: String, required: true }
  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
``` 

### Routing:

We're going to need two routes only! One to create Posts and one to fetch all Posts from our database.

When we do full-stack React apps, we want to make sure we're name-spacing our back-end routes with a prefix of `/api/`. This helps us as developers to more easily differentiate between our routes that will actually return some data, and our client-side routing.

> `mkdir routes/api`

> `touch routes/api/posts.js`

Here are those three routes we talked about. We'll move from here right along to the controller functions:

```js
// routes/api/posts.js

const express = require('express');
const router = express.Router();
const postCtrl = require('../../controllers/post');

// GET all posts
router.get('/', postCtrl.index)

// POST new post
router.post('/', postCtrl.create)

module.exports = router;
```
Don't forget to mount your new router in your `server.js`!!

### Controllers:

Of course, we'll follow the same organization strategy that we've been using all along. All back-end code that will return some data from our database or elsewhere will be organized under 'api'. Let's go ahead and make our one controller file:

> `mkdir controllers/api`

> `touch controllers/api/posts.js`

Let's stub out our three controller functions, export them, and then we'll build them out:

```js
// controllers/api/posts.js

const Post = require('../../models/Post');

module.exports = {
    index,
    create
}

async function index(req, res) {
    // 1. Get all Posts from the database
    // 2. Use res.json() to send the posts to the frontend
}

async function create(req, res) {
    // 1. Create a post in the database (the data will be incoming via `req.body`)
    // 2. use res.json() to send a response to the frontend
}

```


### YOU DO: 
1. Finish the index function. Remember that we want to respond with json, not a template.
2. Finish the create function. The data will be coming in via `req.body`

All done? Let's get this working. In our `Form.jsx`, we'll write a fetch call to hit our create route and controller function.

```jsx
handleSubmit = async () => {
  // First we build the body
  let body = { content: this.state.content }
  // We need an options object for our fetch call
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
  // Now for the fetch call
  await fetch("/api", options)
    .then(res => res.json())
    .then(data => {
      // Call our getPosts function to get fresh data
      this.props.getPosts();
      // clear out this.state.content
      this.setState({ content: "" })
    })
}
```

And that's all! Let's create a couple posts to make sure everything is working.


## ❓ Essential Questions

1. **What folder holds a React app's production-ready code?**

2. **What's the responsibility of the "catch all" route defined in the Express app?** 

3. **True or False: API routes will need to be defined in the Express app so that the React app can CRUD data, etc. on the server.**

4. **True or False: The React app should use a "service/api" module to communicate with the backend's API routes via AJAX.**


## BONUS:

Add the ability for users to reply to posts. Here's what you'll need to accomplish this:
1. An embedded `Messages` model in the `Post` model
2. A route listening for 'POST' requests at `/api/:id`
3. A controller function that will find the relevant post, push the new message in, and call `save()`


## Further Study

### HTML5's History API

Using HTML5's [History API](https://developer.mozilla.org/en-US/docs/Web/API/History), an application in the browser is able to manipulate the browser's current URL using JS and without triggering a server request.

Client-side router software can use the History API to perform client-side routing to load different "screens" of functionality and perform other magic without a causing a request to be sent to the server, thus there's no full-page refresh.

This approach works wonderfully when the client router is in charge and is the only thing manipulating the URL in the address bar. However, what about when a user enters a URL manually, or a link external to the client app is clicked? These cases require a small bit of configuration on the server - a simple "catch all" route that handles all requests that don't match requests for static assets, API routes, etc. The catch all route will then return the **index.html** and all is well.

Later in this unit you'll be introduced to the popular [React Router](https://github.com/ReactTraining/react-router), which uses the History API to perform client-side routing in React SPAs.

### Browser Hash Navigation

The HTML specification includes what is known as **Hash URIs**.

Hash URIs include a "hash" (`#`) in the URI, for example:<br>[https://facebook.github.io/react/docs/react-dom.html#reference](https://facebook.github.io/react/docs/react-dom.html#reference)  

If we browse to the above link, we will see that it takes us directly to the "Reference" section on the page.

Hovering over other titles/sub-titles on the page reveals other links that have their href's set to a value prefaced with a "#", for example:

```html
<a class="hash-link" href="#unmountcomponentatnode">#</a>
```

Notice that when we can click on these links, the address bar changes, but the browser does **not** make an HTTP request.

Today's client-side routers lean toward using the History API over Hash URIs due mainly to the fact that the URL's are "prettier" without the hash.

## References

[React Docs](https://facebook.github.io/react/)
