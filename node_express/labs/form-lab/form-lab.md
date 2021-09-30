# Contact Form Lab

To practice forms, you are going to create a simple contact form, that may look like this:

<img src="https://hackernoon.com/hn-images/0*ZAyh1wiEdgL6tzlB.png" >

# Requirements

1. Create a webserver that delivers a form to your user.
2. When your user submits this form, they will see a nice HTML page that thanks them for their submission, and displays the data that they have just submitted.
    - For example, the message might say: "Thank you for contacting us. You provided the following information. Name: Britney Spears. Email: britney@spears.com. Your message: "Oops I did it again"
3. (optional) Store this data into a (fake) database (array of objects)
4. (optional) Email this form data to yourself using the ```nodemailer``` module.

# Hints for Requirements 1 and 2, above

1. Start off by using express generator to generate a new project, then CD into it.
2. Create a new router with a prefix of your choosing, eg., "/contactus" (ie., Create a new router file in the routes folder with a prefix of your choosing. create the appropriate file in routes/ add the necessary lines to app.js or server.js, etc.)
3. In your "contactus" (or whatever name you chose) router, add the necessary GET request routehandler and POST request handler for the form, explained below.
4. Forms are a 2-step process:
    1. First the user has to send a GET request to localhost:3000/contactus (or whatever) to get a nice HTML page contaning the form.
        - So in your "contactus" router, add a router.get('/' ... route handler that sends the user a form via res.render('form.ejs')
        - In your "form.ejs", make sure that your HTML form has the following:
            - a form action="" attribute that targets your POST route (form action="/contact_us/handle_submit" for example)
            - a form method="POST" attribute
            - <input> elements that contain a name="something" attribute
    2. Secondly, the user submits the form which is a POST request.
        - So in your "contactus" router, you'll need a router.post('/handle_submit'... route handler that 
            - (1) responds with a message (res.send) or a nice HTML page (res.render) and 
            - (2) responds with the information that they provided us (contained in a magic express variable called req.body )
  3. For reference, feel free to consult our "Suggested Workflow to Add Functionality to a Web App" linked in the day 2 homework, and the CRUD routing chart linked in the middleware lesson
5. As always, feel free to check out the lesson notes on "create" or the recordings to guide you.
  




## This lab is a deliverable.

As usual, please push your code to git, and place a link in your deliverables file.
