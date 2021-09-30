# The React Portfolio Lab (Pt. 5: Contact Form)

## Purpose of Lab

This is our first fullstack lab.

Now that we know how to do `<input>`s in React, as well as how to connect a backend (server+DB) to our React app, we need to practice these 3 skills. We strongly recommend using the notes and recordings for those two lessons as reference as you do this lab.

## Task

Somewhere in your react Portfolio, you're going to put in a contact form with several `<input>`s - see, for example, the bottom of this portfolio here: https://aidanb.io/
When your user submits the data, it should end up in your MongoDB database.

Just as with the previous parts of this lab, this can be connected to an ongoing Portfolio, or can be a separate piece.

## Hints (if you need 'em)

### I. Frontend Pt. 1: Connect your `<input>`s to state

1. Make sure the component with the `<input>`s is a class component - because `<input>`s MUST be connected to state in react.
2. Use the ideas from the 'input handling' lesson to connect the inputs to state.
3. Use react dev tools to verify that your user can type stuff into the inputs, and that the `state` changes as they type stuff in. If you can see this, celebrate!

### II. Frontend Pt. 2: Submitting the form
1. When your user clicks submit, that submit button needs to have an onClick attribute that will call a function that you must define, (eg., `formSubmitted`), (similar to addSkill in our 'input handling' lesson)
2. This function should, first of all, use evt.preventDefault() to prevent a full page refresh. (see 'input handling' lesson for reference)
3. The function should eventually use AJAX/fetch to send the user's input information (held in state thanks to Pt.1) to the database. The fetch call may look something like this:
```js
    fetch("http://localhost:3000/api/myAmazingRouteOnMyServer", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({customerName: this.state.customerName, email: this.state.email}) // <-- send this object to server
      }) 
      .then(response => response.json()) // <-- decode server response
      .then(serverData => {console.log("Success:", serverData)}) // <-- log serverData if success
      .catch(error => {console.error("Error:", error)}) // <-- log if error 
```
3. Until we setup a server+DB that can handle a POST at this address/route, however, the above fetch will console.log an error each time. So temporarily perhaps use an alert('form submitted!') inside your `formSubmitted` function in place of the fetch, to test that the form submit process works without refreshing the page. Leave the fetch commented out until step IV.
4. If you can see your "form submitted" alert, celebrate!

### III. Setup Fullstack

1. Connect a backend (server and database) to your portfolio app, the way we did in class during the fullstack lesson. There are too many steps to list here (refer to the backend lesson!), but these steps included:
    - creating a `server.js` file, 
    - using `npm install` to add in the appropriate modules, 
    - adding in the proxy line to package.json, 
    - adding the appropriate files and folders to connect your database and .env file, and 
    - figuring out your database URL. (If you want to use a cloud DB, set one up on mongoDB atlas. If you use a local DB, then your DB_URL or DATABASE_URL .env file variable can be set to a local DB link, eg., mongodb://localhost/myAmazingPortfolioDB)
    - adding a catchall route to deliver your react app
    - doing npm run build to export your app to index.html
2. As explained in the fullstack lesson, run the server in a separate terminal by doing `nodemon server.js` and make sure you see that **the express app is running on port 3001**, and that you are **connected to MongoDB**.
3. Henceforth, you will be working with **both** a frontend terminal running `npm start`, and a separate backend terminal running `nodemon server.js`, and you'll be keeping an eye on both terminals for errors.
4. Test the server! Even though we will only be using ajax/fetch and not browser links to send GET requests to our backend, at this point it can be a good idea to create a temporary test GET route on the server (eg., `router.get('/test', function(req,res) {res.json('server says hi!')})` ), and try to hit this address by typing it into a web browser which will send a GET request. If the server sends you back `server says hi!`, celebrate!

### IV. Backend controller

1. On the backend, your server should have a route handler to handle an incoming POST request from your React contact form. We normally put React route handlers in an `api` router, so the full HTTP verb + address might be something like `POST /api/contacts`.
2. This POST route handler should be connected to a controller
3. This controller should do a few things: 
    - First, It's often a good idea to log 'req.body' to see if your server is receiving any data from the frontend.
    - Next, the controller should pull the user's information out of the POST request (req.body.customerName, req.body.email, req.body.whatever, ...) and then create an entry in your database using mongoose - eg., `await myAmazingMongooseModel.create({ customerName: req.body.customerName, customerEmail: req.body.customerEmail)`. 
    - If you're using async/await make sure to put both `async` and `await` in the right places.
    - (hopefully, you have created a mongoose model to define the structure of the incoming data, eg., customerName: String, customerEmail: String, etc.) and imported it in.)
    - Thirdly, the controller should send a response back to the frontend using the `res.status(200).json('ok')` command or some other string you want to send your server.
4. In your react app, uncomment the fetch in your function that is triggered by your form submit, and make sure the fetch is sending a POST request with the user inputs in the address/route you just defined above.
5. Click the submit button and verify whether data is saved in the database by checking MongoDB compass. If it works, you're done!

Chances are, it will not work on the first go. If it does, you obviously have some kind of deity-like coding ability.

### V. Debugging Fullstack Code

1. If it doesn't work, the detective work begins, and this is a large part of fullstack development. Be methodical and trace through the whole process and identify where things are going wrong:
      - Is the server receiving the message? In your controller, add a console.log("my controller is being hit") to check, and then hit the button again. If you hit the 'submit' button and you see the console.log message, the controller is being hit.
      - If the controller is not being hit, have you added the proxy line to package.json to make sure that react can send AJAX calls to your server in development mode?
      - If the controller is not being hit, then is the frontend even sending the message? Check your frontend terminal for errors.
      - If the controller is not being hit, does your frontend fetch POST address match your backend POST route handler?
      - If the controller is hit, but nothing's showing up in MongoDB, are you receiving the form data? In your controller, add a `console.log("incoming form data:", req.body)` to verify that the req.body variable is being logged (req.body contains your form data).
      - If the controller is hit, but your req.body is empty, make sure you gave your frontend inputs appropriate names. Inputs without names will be ignored by express.
      - If req.body is logging, but nothing's showing up in MongoDB, is your database even hooked up? Does your backend terminal show a **Connected to MongoDB** message?
      - If req.body is logging, but nothing's showing up in MongoDB, is your mongoose code looking okay? Are you importing the model? Are there any terminal errors?
      - If req.body is logging, but nothing's showing up in MongoDB, if you're using async/await, you can try adding a try/catch block around your async/await create({...


Bonus:
- Your frontend, when it sees a positive 'ok' come back from the AJAX, could do some visual confirmation, perhaps by making the contact form disappear, or making a 'thank you' show up via a <a href="https://react-bootstrap.github.io/components/toasts/">toast</a> instead of a simple alert.



# Deliverable

This Lab is a deliverable, and valuable practice for fullstack, and for P4.
