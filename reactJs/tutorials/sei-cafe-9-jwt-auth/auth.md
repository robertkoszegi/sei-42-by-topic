<img src="https://i.imgur.com/fx2orT2.png">

# Token-based Auth with React & JWTs
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case of token authentication |
| Encode/decode a JSON Web Token (JWT) |
| Configure an Express app to provide JWTs |
| Persist a JWT on the client |
| Send a JWT with each request |
| Verify a JWT on the server |
| Protect "private" client-side routes |
| Protect "private" server routes with middleware |

## Roadmap

#### Token-based Authentication:

- Advantages of JWT-based authentication
- What's a JSON Web Token (JWT)?
- Flow of token-based authentication


## Token-based Authentication

### Advantages of JWT-based Authentication

Here's a graphic contrasting session-based and token-based authentication:

<img src="https://i.imgur.com/HlzMMRq.jpg" width="900">

Sessions are stateful on the server - they have to be maintained in a server's memory or a database.  The more active users there are, the more sessions there are to keep track of. High-volume websites require multiple servers and would therefore require special software to manage the sessions.

The key to token-based authentication is that it's **stateless**, meaning there is no _state_ being stored on the server regarding the session/login.

A JSON web token is self-contained, it can itself contain the user's identity, etc. There's no need to fetch the user from a database with each request on the server (an expensive operation). You will only have to query the database for the user if you need to modify the user or obtain additional information from the user document that is not included in the JWT.

The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.

When making an HTTP request, a token can be sent in an HTTP header (or even the HTTP body). They don't have to be sent in a cookie, which are implemented by web browsers. Thus, you can use token-based authentication without a web browser - great news for _native mobile apps_.

### What's a JSON Web Token (JWT)?

A _JSON Web Token_ is a single encoded (not encrypted) string that plays the role of a "token".

The key points about a JWT are:

- The token can contain whatever custom data (called _claims_) we want to put in it.
- The token is cryptographically _signed_ by the server when it is created so that if the token is changed in any way, it is considered invalid.
- The token is _encoded_, but **not encrypted**.  It is encoded using a standard known as _base64url encoding_ so that it can be easily serialized across the internet or even be included in a URL's _querystring_. It's easy to look at **encoded** data and think that its content cannot be read - this is not the case, as you'll soon see.

Here is how a JWT is structured:

<img src="https://i.imgur.com/8J6Rhx9.jpg">

There is a great website dedicated to JWTs that explains in detail their format as well as has the ability to create them:  [https://jwt.io/](https://jwt.io/)

Allow me to take a JWT from the website and demonstrate the fact that the token can be easily decoded in the browser's console:

```js
> var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
> var payload = jwt.split('.')[1]  // only interested in the payload (claims)
> window.atob(payload)
< "{"sub":"1234567890","name":"John Doe","admin":true}"
```
> The `atob()` method decodes a base-64 encoded string and `btoa()` base-64 encodes data.

Okay, JWTs are cool, how does the client get one; and how do we use them?

### Flow of Token-based Authentication

<img src="https://i.imgur.com/3quZxs4.png">

The diagram above shows that the client app:

1. Attempts to log in a user by sending an HTTP POST request, sending along the user's credentials.
2. The server will, if the creds check out, generate a JWT and send it back to the client. It may be sent back as JSON, or in a header (usually named **Token**).
3. Not shown on the diagram, but important, is the fact that the token needs to be persisted somewhere on the client. In a web app, the token is typically persisted in `localStorage`.
4. The reason a client needs to persist a token is that now, whenever the client makes a request, it can send along the token in the HTTP request, either as a querystring, in the request's body, or, as a best practice, in a header named `Authorization`.
5. The server will then validate the token and respond to the request.

## Review the Starter Code

The starter code is a nearing-completion full-stack SEI-CAFE app. We fetch a menu from the DB on the new order page. That's good!

When we view previous orders, we view the previous orders of all customers: Not so good...

When we hit checkout, our order is sent to a server and is stored in the DB without a care as to who placed this order: Again. Not so good...

Gosh, wouldn't it be nice, if we had a user model to tie these orders to? So random anons can't view everyone's orders? And so that your order is tied to YOU?

#### Setup


1. As usual, `cd` into today's `student` folder.
2. Open the project in VS Code
3. Open a terminal in VS Code (`ctrl + backtick`)
3. Install the Node modules: `$ npm i`
4. Create a `build` folder so that the Express app can start:  `npm run build`
5. Create a .env file:  `touch .env`
6. In .env, add a DB connection entry `DATABASE_URL=ToBeProvided` and `SECRET`<-- Your instructor may either provide you with a pre-seeded database, or ask you to use your local mongoDB on disk, in which case, you will likely have to run the `node seed.js` command in order to populate your local DB.
7. After `ToBeProvided` has been updated, start the Express web app:  `nodemon server`  
8. In a separate terminal, start the React Dev Server: `$ npm start`

#### Review the Code

There have been a few minor changes since the componentDidMount lesson.

Frontend:

-	Upon mounting, `<NewOrderPage>` makes an AJAX call within `componentDidMount` to fetch the menu.
-	Upon mounting, `<OrderHistoryPage>` makes an AJAX call within `componentDidMount` to fetch the orders.....of....everybody...... Yikes.
- Our **checkout** button fires off a `fetch` POST to our server at the address POST /api/orders with the cart.
- Our menu **Add** button adds the item to state, and the total is calculated dynamically in `<OrderDetail>`

Backend:

- Our backend `controllers/orders.js` has been changed slightly to show all the orders in reverse chronological order
## Implement Token-based Authentication & Authorization

Implementing token-based auth will require plenty of code in both the Express server app and the React client app.

There's lots to do, so let's get going!

## Step 1: Not logged in? Redirect to `<AuthPage>` 

We can initialize a piece of state in our top-level `<App>` component called `user` which will either:
- contain our userinfo from the DB (if logged in)
- be null (if NOT logged in)

If you're not logged in, we will redirect you to our `<AuthPage>` component.:

>No soup for you!

So in **App.jsx**, initialize the state (and setup a handler method we'll be using soon):

```js
state = {
  user:null,
}

setUserInState = (incomingUserData) => {
  this.setState({ user: incomingUserData})
}
```
And then modify the render() method's return to conditionally render either the `<AuthPage>` or the actual functionality, based on if the user state is null or not:

```js
    return (
      <main className="App">
        {/* this ternary operator asks: is there a user in state? */}
        {/* if yes, they can see our pages: neworder, etc. */}
        {/* if no(user is null), show them only the <AuthPage> */}
        { this.state.user ? 
          <Switch>
            <Route path='/orders/new' render={(props) => (
              <NewOrderPage {...props}/>
            )}/>
            <Route path='/orders' render={(props) => (
              <OrderHistoryPage {...props}/>
            )}/>
            <Redirect to="/orders" />
          </Switch>
          :
          <AuthPage setUserInState={this.setUserInState}/>
        }
      </main>
    );
```

`<AuthPage>` has been provided for you, as have its child components, `<SignUpForm>` and `<LoginForm>`.

Great! We should now have: 
- a login and signup page with inputs that work, and 
- we can toggle between our login and signup pages
- If we investigate the state using react dev tools, we can log ourselves in by manipulating the state to not be null ;)

As much fun as it is "hacking" our own app, let's transition towards the important backend code to generate the jwt tokens.

## Step 2: Frontend must "POST /api/users/login" and "POST /api/users/signup"


In **SignUpForm.jsx**, notice that the handleSubmit currently isn't doing much. Let's update the handleSubmit try/catch to include these lines, and discuss as we put them in:

```js
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password,})
      })
      
      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
      
      let token = await fetchResponse.json() // 3. decode fetch response to get jwt from srv
      localStorage.setItem('token', token);  // 4. Stick token into localStorage
      
      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      this.props.setUserInState(userDoc)

    } catch (err) {
```

Likewise, in **LoginForm.jsx**, replace the empty try/catch with the following:
```js
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.state.email, password: this.state.password, })
      })

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')

      let token = await fetchResponse.json() // 3. decode fetch response: get jwt token from srv
      localStorage.setItem('token', token);  // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split('.')[1])).user; // 5. Decode the token + put user document into state
      this.props.setUserInState(userDoc)

    } catch (err) {
```

Excellent. Now our frontend is sending our userdata to the server. Which the server is ignoring. Let's fix that...

## Step 3: Backend model, route, and controllers

Our frontend is sending over a name, username, email and password. So in order to put this in the DB, we'll require
a mongoose model that handles these fields.

In `models/` create a file called `user.js` to store our user model. We'll talk about some of the cool tricks being applied here as we type this in:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true, // trims whitespace if your user types something like " alex@123.com " into "alex@123.com"
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
}, {
  timestamps: true,
  // A cool mongoose trick to not send passwords to clients! (even though they'll be hashed)
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

module.exports = mongoose.model('User', userSchema);
```

Ok now we have a model. Now let's add our routers and controllers. Let's mount our router in `server.js`:
```js
app.use('/api/users', require('./routes/api/users'));
```

Create a file in `routes/api` called `users.js`:

```js
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

// POST /api/users/signup
router.post('/signup', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

module.exports = router;
```

And now create a file in `controllers/` called `users.js`. We're about to do something VERY BAD and dangerous:

```js
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // import the jwt library

module.exports = {
  create,
  login
};

async function create(req, res) {
  try {
    // NOTE: here we are storing a plaintext password. VERY VERY DANGEROUS. We will replace this in a second:
    const user = await User.create({name: req.body.name, email:req.body.email, password:req.body.password,});

    // creating a jwt: 
    // the first parameter specifies what we want to put into the token (in this case, our user document)
    // the second parameter is a "secret" code. This lets our server verify if an incoming jwt is legit or not.
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.status(200).json(token); // send it to the frontend
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    // check password. if it's bad throw an error.
    if (req.body.password !== user.password) throw new Error();

    // if we got to this line, password is ok. give user a new token.
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    res.status(200).json(token)
  } catch {
    res.status(400).json('Bad Credentials');
  }
}
```

In order for the above code not to crash, you'll have to `npm install jsonwebtoken`.

Now try to signup. And try to login. Stuff is happening visually. Yay. And if you use react dev tools, you can verify that the `<App>` component contains a `user` in state. 


Let's recap the things that are working:
1. Frontend: Our UI changes depending if we have a user in state or not.
2. Frontend: Our login and signup forms can successfully POST to the server, and 
3. Backend: the server can create users in the DB + verify.
3. Backend: The server is creating and verifying JWT tokens very well.
4. Frontend: We're storing our user both in state and localStorage.

Surely we haven't missed anything!! Now refresh your page. Oh. :(

#### Quick Fix: refresh bug
Since we don't want the user to get logged out each time we refresh, so whenever our component mounts, let's grab any saved jwt tokens from localStorage, decode it, and put the user into state.

Do this in App.js:
```js
  // when the page refreshes, check localStorage for the user jwt token
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc})      
    }
  }
```

Great!

## Step 4: Storing encrypted passwords

Now let's talk about the other elephant in the room:

If you check your mongoDB, you will see that a user has been added to the database.....with a VERY BAD plaintext password that anyone can view. This is an absolute, 100%-never-ever-should-you-ever-do-this-ever screwup: We do not store plaintext passwords. This is VERY dangerous.

**Firstly**, let's install the popular, secure bcrypt library to salt and hash the password:

`npm install bcrypt`

and then import **bcrypt** in our `controllers/users.js`:

```js
const bcrypt = require('bcrypt'); // import bcrypt

const SALT_ROUNDS = 6; // tell bcrypt how many times to randomize the generation of salt. usually 6 is enough.
```

**Secondly**, still in `controllers/users.js`, in our `create` function, change this:
```js
    // NOTE: here we are storing a plaintext password. VERY VERY DANGEROUS. We will replace this in a second:
    const user = await User.create({name: req.body.name, email:req.body.email, password:req.body.password,});
```
to:
```js
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS)
    const user = await User.create({name: req.body.name, email:req.body.email, password:hashedPassword,});
```

**Thirdly**, still in `controllers/users.js`, in our `login` function, change this:
```js
    // check password. if it's bad throw an error.
    if (req.body.password !== user.password) throw new Error();
```

to:
```js
    // check password. if it's bad throw an error.
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
```

Now try both signup **and login**, and check out your database! The users' passwords should now be hashed!

Done with Encryption!!

## Step 5: PROTECT MUH ROUTES

In addition to being used for signup/login, a jwt can be used for protecting routes.

#### A tale of two problems

Let's look at two major problem we currently have in SEI Cafe that can be solved by protecting routes:
1. Right now in theory anybody can 'checkout' an order by sending a POST /api/orders, and the server has no idea who's sending the order.
2. In the order history page, currently everyone can view everyone else's orders by sending a GET /api/orders. 

This is wrong. These features should only be available to logged in users.

If SEI were a banking app, I shouldn't be able to POST purchases to somebody else's account, nor should I be able to view all the other clients' transactions. Typically, in order to see one's bank transactions at a real bank, I have to show them some identification, or at least my debit card and PIN. In the jwt world, our jwt is our identification and the server can tell if our identification is legit or not.

So, 3 steps for protecting routes:

1. **Frontend:** To access protected routes, the frontend sends a JWT in a header.
2. **Backend verifies:** The server can verify that the JWT is valid before allowing access to top secret **protected routes**. 
3. **Backend decodes:** Furthermore, the server can decode the token, figure out who it belongs to, and get stuff specific to that user, or put stuff in the DB specific to that user.

So, applying this to SEI CAFE, in order to access protected information, eg.,`POST /api/orders` (checkout button):
1. the frontend should send over a jwt token, and 
2. the backend can check if this user is legit. 
3. Furthermore, the server can then decode the token, figure out the user, and create the order in the DB + assign the order to a specific user.

For `GET /api/orders` (order history page), once again:
1. the frontend can send over a jwt token, and
2. the backend can check if this user is legit.
3. Furthermore, the server can then deocde the token, figure out the user from the token, and fetch JUST all of that user's orders.

Let's run through these two examples simultaneously to see how protecting routes is done.

#### Protecting Routes Pt. 1 : Frontend sends token

When the user hits the "checkout" button to POST his order to `POST /api/orders`, as this ought to be a protected feature, let's send the JWT over. Refactor the fetch in the **NewOrderPage.jsx handleCheckout() method** in order to embed the JWT into a header.

Change this in **NewOrderPage.jsx**:
```js
  // send cart to server
  handleCheckout = async () => {
    try {
      let fetchResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
```

to:

```js
  handleCheckout = async () => {
    try {
      let jwt = localStorage.getItem('token')
      let fetchResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {"Content-Type": "application/json",'Authorization': 'Bearer ' + jwt},
```

> Don't forget the space after Bearer

Let's fix problem #2 where everyone can see everyone's orders - let's send the JWT over for fetching `GET /api/orders` which ought to be a protected route. Refactor the fetch in `OrderHistoryPage.jsx` in order to embed the JWT into a header:

In **OrderHistoryPage.jsx**, change this:
```js
      let fetchOrdersResponse = await fetch('/api/orders') // <-- get data from server (Stream object)
```

to:
```js
      let jwt = localStorage.getItem('token')
      let fetchOrdersResponse = await fetch('/api/orders', {headers: {'Authorization': 'Bearer ' + jwt}})
```



As you can see, in both cases, we added an additional header named [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) which has been specified by the HTTP specification as the header to use for providing credentials.

Note the pre-pending of the word **Bearer** to the token, followed by a space, then the token. This is a standard to follow when using token-based authentication.

To verify that the token is being sent in the headers properly:

- Open the **Network** tab in Chrome DevTools.
- Refresh the Order History page.

Inspecting the Request Headers to view that you can see the Authorization header has value 'Bearer - eyJs123123somekindoftokenblobthing'

#### Protecting Routes Pt. 2: Backend decodes token --> creates "req.user"


The token we're sending from the frontend contains the user's info which we can attach to the `req` object. (ie., we won't have to hit the database to fetch the user data. No session, no querying the database: scalability.)

> Note, although we will have `req.user` like when we used **passport**, this `user` property will **not** be an actual Mongoose document, it's just a plain JS object that we're grabbing from the token. This is very lightweight and performant. However, if you need to perform any CRUD on an actual document for the logged in user, you will have to query the DB to obtain the user document first using `req.user._id` provided by the token.

On the server, we're going to create a module that will export a custom middleware function that:

1. Checks if there's a token in the headers of the HTTP request. For additional flexibility, we'll also check for a token being sent in the query string or the body of the request.
2. Verifies the token is valid and hasn't expired.
3. Decodes the token to obtain the user data from its payload.
4. Then finally, adds the user payload to the Express request object

First, let's create a module file for the middleware function:

`$ touch config/auth.js`

Here's the custom **auth.js** middleware that we'll discuss as we type it in:

```js
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  // Check for the token being sent in three different ways
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        next(err);
      } else {
        // It's a valid token, so add user to req
        req.user = decoded.user;    
        next();
      }
    });
  } else {
    next();
  }
};
```

We're using the `jsonwebtoken` module's `verify` method to verify the token is legit.

Again, we are checking for a token being sent in the request in three different ways by a client:

- In the header (this is how we are currently sending it)
- In a query string, or
- In the body

Adding this extra flexibility costs nothing and may allow our API to be accessed from other apps/devices more easily.

#### Prep: Mount the Custom Middleware

As we've seen before, the order that middleware is mounted matters.

For efficiency's sake, we don't want to bother checking for a token, verifying it, and adding the user payload to the Express request object unless we need to!

If all the routes in **routes/api/orders.js** needed to be protected, we could add the middleware in **server.js** like this:

```js
app.use('/api/users', require('./routes/api/users'));
// Mount our custom auth middleware to protect routes below it. These routes will have access to the "req.user" variable.
app.use(require('./config/auth'));
app.use('/api/orders', require('./routes/api/orders'));
```

The above code would skip checking for a token when handling any of the **user** related routes (signing up or logging in/out) but WOULD check for a token for the protected /api/orders routes.

Alternatively, if you just want to check for a token in one or two controller functions, you can use the middleware within **routes/api/orders.js** router module like this:

```js
const express = require('express');
const router = express.Router();
const orderCtrl = require('../../controllers/orders');

/*----------Unprotected routes here ----*/

/*---------- Protected Routes ----------*/
// Process the token for only the routes below. These routes will have access to the "req.user" variable.
router.use(require('../../config/auth'));
router.post('/', orderCtrl.create)
router.get('/', orderCtrl.index)

module.exports = router;
```

Apply the auth middleware in one of the above places. Your choice! Just be sure to mount your auth middleware before mounting any routes/routers that need access to `req.user`.

#### Protecting Routes Pt. 3: Backend does user-specific stuff using "req.user"

Again, just to recap, the first major problem we currently have in SEI Cafe that can be solved by protecting routes is:
1. Anybody can 'checkout' an order by sending a POST /api/orders, and the server has no idea who's sending the order.

To fix problem 1, now that the frontend is sending over the token, and the backend is decoding the token, the server can just make sure that during the mongoose `create` action, it specifies which user this order belongs to.

In `models/order.js`, let's update our orderSchema to reference our user model.

```js
const orderSchema = new Schema({
  lineItems: [{qty: Number, item: {name: String, emoji: String, category: {type: Schema.Types.ObjectId, ref: 'Category'},price: Number}}],
  // add this:
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});
```

And in `controllers/orders.js`, change this line in the `create` function from this:

```js
    await OrderModel.create({lineItems: req.body.lineItems})
```

to:

```js
    await OrderModel.create({lineItems: req.body.lineItems, user: req.user._id})
```



The second major problem we had in SEI Cafe was:

2. In the order history page, currently everyone can view everyone else's orders by sending a GET /api/orders. 

To fix this, still in `controllers/orders.js`, change this line in the `index` controller function from:
```js
    let orders = await OrderModel.find().sort({createdAt:'desc'}).exec();
```

to:

```js
    let orders = await OrderModel.find({user: req.user._id}).sort({createdAt:'desc'}).exec();
```

Note how useful the `req.user` variable is. It lets us create something for JUST one specific user, and lets us find JUST this user's orders.

## YOU DO (10 minutes)

We've done a lot, but there are still two minor things left. Let's see if you can do them, and we will take up the first two answers in a few minutes.
1. **(important!) Logout -** currently, when we click the logout button we aren't setting the user state back to null, nor are we removing the token from localStorage. Make it happen!
2. **(important!)** Name: ?? Email: ?? - currently, when we're logged in, we're not seeing the name and email show up. Make it happen!
3. **(important!) Expired tokens -** currently, when we are getting the JWT from localStorage in our `App.js` 's componentDidMount method, we aren't worrying about whether the token is expired or not. How can we remove the token if it is expired? Hint: the config/auth contains some code that may help.
4. **(optional) Service modules -** Depending on the size of the app, it can be nice to have all our token-related methods in a "token" service module. And it can also sometimes be nice to organize all of our fetch calls into service modules - eg., a items-related service module, or an orders-related service module. Feel free to try refactoring the code to give this a shot. 

## Further practice

Want more? You may wish to check out the <a href="../../../resources/old_jwt_lesson">old jwt lesson</a> (based not on SEI Cafe but on a different app, react mastermind, that used a lot more of these service modules to organize the code. It's a bit of a longer lesson but could be fun to browse through for those who want more jwt!

## Essential Questions

No way!

## Lab

It is a requirement to implement token-based auth in your upcoming project.

The time to implement auth will come very early during your project's development - in fact, you will need to implement authentication before any of the app's functionality (other than the landing page functionality and client-side-routing (ie., pages) functionality).



