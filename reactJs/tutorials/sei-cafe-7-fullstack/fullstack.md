<img src="https://i.imgur.com/fx2orT2.png">

# Full-stack React
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Ready a React app for production |
| Logically structure a full-stack React project |
| Configure an Express app to serve a React app's **index.html** file |
| Configure an Express app to accommodate client-side routing |
| Configure a React project for full-stack development |

## Roadmap

- Setup
- Review 1: Why Full-stack?
- Review 2: Architecting a Full-stack React App
- Review 3: Building the React App's Production Code
- Code the Express App
- Configure React for Full-stack Development
- Deploying to Heroku
- Essential Questions

## Setup

The starter code is the SEI CAFE app that includes the pages implemented from the previous lesson.

- `cd` into today's student folder
- Open a terminal in VS Code (`ctrl + backtick`)
- Just in case, install the Node modules: `$ npm i`
- Start the React Dev Server: `$ npm start`

## Review 1: Why Full-stack?

Thus far, our React apps have been static, front-end only apps that don't communicate with a server after the _index.html_ has been delivered.

It's _possible_ for static front-end only SPAs to have a reasonable amount of functionality if they incorporate calls to APIs or cloud services like Firebase.

However, most SPAs rely on a backend server app for tasks such as:

- Performing CRUD
- Authenticating users

Such an app, where we write code that runs on the front-end and the backend, as you know, is a full-stack application.

## Review 2: Architecting a Full-stack React App

Up until this point, we've taken for granted that full-stack apps, like your Express and Django projects, were single, integrated projects.

However, developing a MERN-stack (MongoDB, Express, React & Node) project involves complexities such as tooling, React's integrated development server, etc.

Basically, there are complications in both **development and production** environments that have to be addressed.

#### Complications During Development 

If we're going to develop a MERN-stack app, we have to figure out how we're going to:

- Use React's Development Server (`npm start`)
- **and**, run `nodemon` to productively develop an Express backend that can respond to AJAX requests sent from the React front-end

<details>
<summary>There's a conflict between React's development server and Express development - what is it?</summary>
<p><strong>They both run on port 3000 by default.</strong></p>
</details>

<br>

> Key Point: When developing a MERN-stack app, you will need to launch **both** React's development server (`$ npm start`) **and** the Express app (`$ nodemon server`) in separate terminal sessions.

#### Production Environment Complications

As we develop our React app locally, we're writing source code that React's dev server builds and runs automatically.

However, the React dev server is a local tool that does not run in the cloud, i.e., on Heroku.

We need to ensure that whatever hosting service we use is configured to **build** the React app with each deployment.

Luckily for us, beginning in 2019, Heroku started to automatically build React apps for us.

In addition to ensuring that the hosting service builds the React app, we need to ensure that we code the Express backend app to serve the built production code

#### Possible Full-stack Architectures

There are two general architectures we could pursue:

1. Maintain **two** separate projects, one for the React SPA, the other for the Express backend.
1. Integrate the codebase for both the React front-end and the Express backend.

| Architecture | Pros | Cons |
| --- | --- | --- |
| Separate Projects | Easier to set up. | Manage two projects and git repos. Must deploy to two separate hosts, **or**, copy over the front-end production code to the server project before each deployment. There will be cross-site configuration issues as well. |
| Single Project | A single codebase! | None |

The single, integrated project approach looks to be a no-brainer. But, what does the structure of a single project look like?

Again, two options:

1. Start with an Express app, then generate the React app within it (naming it `client` or something similar). This approach will result in nested **package.json** files and **node_modules** folders requiring you to "know where you are" when installing additional Node modules.
1. Start with a React app, then add an Express **server.js** and other server related folders/files as necessary. This approach results in a single **package.json** file and **node_modules** folder.

The second option is "cleaner". Plus, we already have SEI-CAFE eager to be made full-stack, so we'll opt for that approach...

## Review 3: Building the React App's Production Code

If we want to be able to test locally how our full-stack application is going to run when deployed, we'll need to:

- Build the React app's code locally - this is called "production code"
- Configure Express to serve the production code

So, how do we make the `index.html` & React's JavaScript production-ready? 

Thankfully, the `create-react-app` CLI includes tooling and a **build** script in **package.json** that, when run, converts the the code in the `src` and `public` folders of the React project into production code.

Let's run it:

`$ npm run build`

> Note: npm requires us to use the `run` command for scripts other than `start` and `test`.
 
After building, examining our project's structure reveals a new **build** folder containing a production ready **index.html**, **static/css** & **static/js** folders, and other less important stuff.

This **build** folder of production-ready goodness is ready to be served up by an Express backend...

## SEI-CAFE Fullstack Setup + Send order to server.

As motivation for our fullstack lesson, let's say we want to make the "checkout" button send the (currently anonymous) user's order (ie., shopping cart items) to the database. (In the JWT auth lesson, we will improve all this to be based on a logged-in user. In practice, it's not really likely that you will be using "checkout" anonymously.)

<img src="https://user-images.githubusercontent.com/24878576/115160564-deccbc80-a066-11eb-8487-5a11b2a428e3.png" height="500">

We're going to code our own Express app from scratch since we want our Express app to be within the existing React project & repo. Using `express-generator` would have created a nested folder containing another **package.json** - which we're trying to avoid.

In a MERN-stack app, the backend Express app only does two things:

1. Serves static assets, such as `index.html`, to the browser, and
2. Responds to AJAX requests from the React app running in the browser

The Express server will never access any of the source code for the **React project**.

It simply needs to deliver the **production-ready** `index.html`, which will in turn request the **production-ready** scripts, etc., that were built using `$ npm run build`.

## Step 1: Install the Modules for the Express Server

The full-stack architecture we decided on uses a single **package.json** file (the one that was created by `create-react-app`).

There's no problem with the Express project sharing that same **package.json**.

For now, we're only going to install a minimal number of modules for the Express app:

`$ npm i express morgan serve-favicon`

> Note: We don't need a view engine because our server will be either serving static assets (index.html, CSS, JS, images, etc.) or responding to AJAX requests with JSON. There will not be any *.ejs templates rendered - just a single static _index.html_ - this is truly a SPA!

In step 4, to add additional features such as database access, etc., you'll need to install additional modules like `mongoose`, `dotenv`, etc..

## Step 2: Create and Code the Express App (`server.js`)

Let's write our server:

1. Ensure that you're still in the root folder of the React project.

2. `$ touch server.js`.

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



4. Mount and configure the `serve-favicon` & `static` middleware so that they serve from the **build** (production-ready) folder:

	```js
	app.use(express.json());
	
	// Configure both serve-favicon & static middlewares
	// to serve from the production 'build' folder
	app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
	app.use(express.static(path.join(__dirname, 'build')));
	```

5. A single "catch all" route is required for client-side routing to work properly:

	```js
	// Put API routes here, before the "catch all" route
	
	// The following "catch all" route (note the *)is necessary
	// for a SPA's client-side routing to properly work
	app.get('/*', function(req, res) {
	  res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	```
	
	> Note: Since this route is a "catch all" that matches every `get` request, be sure to mount API or other routes before it!
	
	The "catch all" route is necessary to route to the proper client-side route when:
	- A user types a path into the address bar and presses enter.
	- The user refreshes the app.
	- A link is clicked in an external website, email, etc., that has its `href` set to our SPA's hostname.

	For example, if we slack the following link to a friend: `https://myapp.herokuapp.com/sales/dashboard`. The friend clicks on it, initiating an HTTP request to our server.
	
	However, the `/sales/dashboard` part of the URL is supposed to be for the client router - not the server!  But there it is, and the server has to deal with it...
	
	The server deals with it by, thanks to the "catch all" route, sending back  **index.html** - which is what we want.
	
	When **index.html** loads in the browser, and our SPA's router kicks into action, it will see the path of `/sales/dashboard` and route to the correct feature, just as if the link was clicked from within the SPA!

6. Set the port for development to use 3001 so that React's dev server can continue to use 3000 and finally, tell the Express app to listen for incoming requests:

	```js
	// Configure to use port 3001 instead of 3000 during
	// development to avoid collision with React's dev server
	const port = process.env.PORT || 3001;
	
	app.listen(port, function() {
	  console.log(`Express app running on port ${port}`)
	});
	```

#### Test It Out

Again, to develop a MERN-stack app, you'll need two terminal sessions:

1. For running the Express backend

2. For running React's dev server

##### Start the Express Backend

It's recommend that you start the Express backend first by typing<br>`$ nodemon server.js` or `$ nodemon server`

We can no longer just type `$ nodemon` because when we do, nodemon uses the `start` script in **package.json**, however, the `start` script is configured for React's dev server.

You should express console.log a startup message in your backend terminal:

<img src="https://user-images.githubusercontent.com/24878576/115160846-5cdd9300-a068-11eb-808e-1cb58144eb27.png" >

##### Checking out the PRODUCTION app

If we want to see how the app will behave when deployed, we need to:

- Do `$ npm run build` to **export** your React code to a production-ready **index.html** file and build folder.

- Browse to `localhost:3001` because that's where our Express server is running - which again, we coded to serve from the **build** folder.

<details>
<summary><strong>Question</strong>: During development, is it better to browse to `localhost:3001` or `localhost:3000` to test your latest frontend code? Why?</summary>
<p><strong>Answer:</strong><ul><li>Your latest React code is on `localhost:3000` so test it there.</li><li>We only test `localhost:3001` to check out the deployed/exported/finished app. It is based off of the last time we did <strong>`npm run build`</strong>.</li><li>Since we don't want to keep doing `npm run build` over and over in order to test our app on `localhost:3001`, we prefer to test our app on `localhost:3000`.</li></ul></p>
</details>


##### Start React's Dev Server

Now that you've checked out the what the production code will look like when it's deployed, let's start up the development environment as usual:

```
$ npm start
```

#### Review

**When browsing to `localhost:3001`, what version of the app will you be viewing?**

**What command must we run in Terminal to update the production code?**


## Step 3: Configure React for Full-stack Development (proxy)

So far, so good, but there will be a problem **during development** (not production)...

Because the React app is being served from `localhost:3000`, that's where all AJAX calls made from the browser to the server will go.

For example, your React app might make fetch a request like `GET /api/posts`.  That path is automatically appended to the domain of origin, e.g., `localhost:3000`.

However, our Express server is listening for AJAX calls at `localhost:3001`!

Luckily, the React team has created an easy fix for this dilemma. The React development server allows us to configure a "proxy" which specifies the host to send API/AJAX calls to.

The fix is to add a `"proxy"` key anywhere in the top-level object of  **package.json**:

```js
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

Now **during development**, the SPA can make AJAX calls to the server, such as `fetch('/api/todos')`, and they will be sent to `localhost:3001` instead of `localhost:3000`.

The Express backend is configured and ready for additional backend functionality to be coded. 
We're -ERN stack right now. 

Now we just need a database! Let's put in the M.

## Step 4 - .env & Database (config, schema, model)

1. Use `npm` to install `mongoose` & `dotenv`.

2. Create a `.env` file to hold the `DATABASE_URL`. For today, your instructor will either give you a connection string, or you can use your computer's mongoDB install with a local connection string `mongodb://localhost/sei_cafe_DB`

For your P4, you will be creating your own DATABASE_URL to connect to your <a href="https://cloud.mongodb.com/">Atlas MongoDB</a> cloud DB. The connection string to be used in `database.js` can be obtained using <a href="w06/d1/atlas-hosted-mongodb.md">the steps from the week 6 mongoDB atlas lesson</a>.

You can even use the same Atlas connection string that you used in Project 2, however, be sure to change the **namespace**/**database** name within the connection string. An Atlas hosted connection string would look something like:
```
DATABASE_URL=mongodb+srv://sei_rocks_1:sei_rocks_1@cluster0.px94f.mongodb.net/SEI_CAFE_DB?retryWrites=true&w=majority
```
Again, be sure to change the database name to something different for your Project 4. 

3. Create and code the `config/database.js` module. Put in the usual boilerplate:

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

4. Be sure to `require('dotenv').config()`, followed by `require('./config/database.js')` in `server.js` and verify that the database is connecting as planned.

<img src="https://user-images.githubusercontent.com/24878576/115161305-f3ab4f00-a06a-11eb-8b1b-bd1d7f8f6c0a.png" >

5. **Schema and Model**: We don't want to throw random unstructured data into our database, so let's define a schema in order to perform CRUD using Mongoose models. If we want to setup **Create** functionality for an order, we'll need a model for an order. Make a folder called `models` and within that, make a file called `order.js` with the schema below, which specifies that an order is an array of shopping cart items (a quantity + an item object). 

```js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  lineItems: [{qty: Number, item: {name: String, emoji: String, category: String, price: Number}}],
}, {
  timestamps: true,
});

let OrderModel = mongoose.model('Order', orderSchema); // .model compiles the schema into a model
module.exports = OrderModel;                           // export model
```

Keep in mind that defining the schema is often not a one-time thing. You'll likely make errors, or have to refine your data model several times as you try to put actual data into the DB from your app.
## Step 5- Routes, controllers

In order for our frontend to POST an order to our database, we'll need a route, and a controller function.

1. Create 2 more folders `routes`, & `controllers` to keep our backend code organized.

In a SPA, our frontend uses AJAX to talk to our backend. These AJAX routes will be API-type routes, i.e., they should be namespaced using `/api` and respond with JSON, not EJS views, i.e., `res.json(...)` instead of `res.render(...)`.

2. Figure out our HTTP verb and address. Our verb and address be `POST /api/orders`

3. Define a router. We'll need an "api/orders" router to handle the prefix `/api/orders`. 

Add this line to server.js, before the "catch all" route to **mount** a router:
```js
// Put API routes here, before the "catch all" route
app.use('/api/orders', require('./routes/api/orders.js'));
```

4. Define the route handler now. Within the routes, folder, create a folder called `api/`. 
And within `routes/api/`, create a file called `orders.js`, which looks like this:

```js
// routes/api/orders.js

const express = require('express');
const router = express.Router();
const orderCtrl = require('../../controllers/orders');

// Route handler for POSTing a new order. Full address will be POST /api/orders
router.post('/', orderCtrl.create)

module.exports = router;
```

5. Define the controller. Within `controllers/` make a file called `orders.js`, which looks like this:
```js
// import the Order Model. I'm calling this OrderModel for clarity, but typically this variable is called Order
const OrderModel = require('../models/order.js'); 

module.exports = {
    create
}

async function create(req, res) {
  try {
    // 1. put the order in the database (the data will be incoming via `req.body`)
    await OrderModel.create({lineItems: req.body.lineItems})
    // 2. send a response to frontend - typically we send back the newly created order, or all the list of orders, or just an 'ok'
    res.status(200).json('ok. Order added to DB!')
 } catch(err) {
    res.json(err);
 }
}
```

Perfect! Now we have a server + DB that can, in theory handle a POST request for an order, and stick it into the DB.

## Step 6. Test. Try to POST an order with AJAX/fetch


Let's test our server+DB out by POSTing an order from our React frontend. Let's make it so that when you click the big orange checkout button, React sends a POST request to the server.
<img src="https://user-images.githubusercontent.com/24878576/115160564-deccbc80-a066-11eb-8487-5a11b2a428e3.png" height="500">

In `src/pages/NewOrderPage.jsx`, let's write a method to POST the current `lineiItems` in state to the server, above the render() method:

```js
  handleCheckout = async () => {
    try {
      let fetchResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({lineItems: this.state.lineItems}) // <-- send this object to server
        }) 
      let serverResponse = await fetchResponse.json() // <-- decode fetch response
      console.log("Success:", serverResponse)   // <-- log server response

      // if the order was sent over without errors, set state to empty
      this.setState({lineItems: []})
    } catch (err) {
      console.error("Error:", err) // <-- log if error 
    }
  }
```


In `src/components/OrderDetail.jsx`, replace the onClick on the CHECKOUT button with this:

```js
<button className="btn-sm" onClick={()=>{props.handleCheckout()}}>CHECKOUT</button>
```

So the child component is trying to call handleCheckout() which is defined in the parent. We forgot to pass the method down as props. So in NewOrderPage.jsx, change:

```js
<OrderDetail  lineItems={this.state.lineItems} />
```

to:

```js
<OrderDetail handleCheckout={this.handleCheckout}  lineItems={this.state.lineItems} />
```

Do an `npm start` and test that when you click checkout, a console.log tells you the data is sent to the database!

In a real world e-commerce scenario, you would probably send over a unique order id with the order, not to mention, when the user clicks checkout, you would want to integrate a payment system, so they don't just dine and dash.....

## One Last Note: Deploying to Heroku

##### IMPORTANT: If your project is inside of an outer repo, you can't deploy it because you can't create a nested repo.  You'll need to move the project's folder outside of any existing repo before you can deploy.

You want people to run your react apps, right? Get them deployed! 

> It's recommended that you test the production app before deploying.  Again, do this by building the React app (`$ npm run build`) and browsing to `localhost:3001`.

With the MERN-stack app tested, we're **almost** ready to deploy to Heroku...

##### Add a `Procfile`

After the code has been uploaded using `git push heroku master`, Heroku checks to see if the project has a **Procfile** which specifies how to start up the application.

If no **Procfile** exists, Heroku will run the command assigned to the `start` script in **package.json**. Yes, we have a `start` script, but it's configured to start React's dev server instead of `node server.js`.

So yes, we need to create a **Procfile** (named exactly without a file extension):

- `$ touch Procfile`

Then, adding a single line inside **Procfile** takes care of informing Heroku how to boot our app:

```
web: node server.js
```

##### How does Heroku know to build the React app?

The production-ready code that we tested out locally lives in the **build** folder. However, the **build** folder is git ignored and thus will not be pushed to Heroku.

So, the production code needs to be built on Heroku...

Thankfully, when JS apps are deployed, Heroku automatically runs the `"build"` script if it exists, which it does!

##### Create the App in your Heroku Account

Now let's use the Heroku CLI to create the project in your Heroku dashboard:

- `$ heroku create <optional_preferred_subdomain>`

The above command also creates a git remote named `heroku` that we push to in order to deploy.

Now you are set to deploy to Heroku:

1. Make a commit (if you haven't already): `$ git add -A && git commit -m "Deploy"`

2. Push to Heroku: `$ git push heroku master`

##### Set the Environment Variables on Heroku

The last step is to ensure that every KEY=VALUE pair in the `.env` file is set in the Heroku project.

No different than with the two previous projects deployed to Heroku. For each KEY=VALUE:

```
$ heroku config:set KEY=VALUE
```

##### Open the App

`$ heroku open` and now everyone can run your MERN stack app!

<img src="https://user-images.githubusercontent.com/24878576/115179773-14db6200-a0a2-11eb-82ba-abf11ccbd09e.png">

## Essential Questions

1. **What folder holds a React app's production-ready code?**

2. **Why does a "catch all" route need to be mounted in Express?** 

3. **True or False: API routes will need to be defined so that the React app can obtain data, create data in the database, etc.**

4. **True or False: The React app should use a "service" module to communicate with the backend's API routes via AJAX.**

