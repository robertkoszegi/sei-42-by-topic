# Lab: Idea -> ERD -> Model

The way programmers communicate their database's structure with each other is using an Entity-Relationship Diagrams (ERD).

A 100% anonymous website may look like our mongoose-movies ERD. Note there's no "User" who has to login or own any data:

<img src="https://i.imgur.com/CVTFHMJ.png">

However, any website where you have to login to do stuff (ie., isn't 100% anonymous, will include a "User" or "Customer" entity.) 

<img src="https://i.imgur.com/HNl0hNa.jpg">


Sometimes the `User` (or `Customer`) will own some pieces of data. In the first picture above, the Customer can have/create/own orders. So each order belongs to the customer, and 1 customer can have many orders, and so we have expressed that `1-to-many relationship` with a one-directional pitchfork connecting Customer and Order. (The big O and the --||-- don't matter too much at this point, just the pitchfork -----<). The one-directional pitchfork means one Customer has Many Orders.

However, the company may also have Products, which none of the currently-logged-in users own. So the `Products` wouldn't have an arrow connecting to `User`. 

That said, 1 `Order` perhaps references many `Products` in a Product collection. Otherwise, how would we be able to know what to ship? Similarly, 1 `Product` might belong to many `Orders` at the same time. So we draw a bidirectional pitchfork representing a `Many-to-many` relationship.

>### <em>Note: Each "entity" in your ERD usually ends up as a mongoose schema, with either its own model or embedded in another model.</em>

It's not always easy to figure out what "entities" our database should have when we're first diagramming out the structure. It takes about 10-20 tries to truly get the hang of it, hence: this lab. 

There are also plenty of tutorials and reading online that can help, such as <a href="https://www.youtube.com/watch?v=QpdhBUYk7Kk">this youtube series</a> by the creators of LucidChart.

This lab asks you to create 3 ERD's to practice making ERD's.

## Task 1: Anonymous File sharing Website

Consider an anonymous file-sharing website, such as file.io or zippyshare. This is an easy example to consider because there is no login. There is no "User" entity.

Your task is: 
1. <strong>Plan:</strong> Draw an ERD to represent the data model of this website. What entities will you need to support all of the user's actions? Do you need a "user" entity because you need to store a user's username and password if it's anonymous? (You may hand-draw or use a free online ERD drawing tool like lucidchart or draw.io to do this.)
2. <strong>Implement:</strong> Create a models/ folder, as you would if you were making a real app, and within this folder, create some files with the schemas and models you feel are necessary to implement your ERD.
3. (optional) (bonus): Implement a mockup version of this, where you allow an anonymous user to upload a file to your server. You may use nodeJS's nodejs library called `multer` or you may use the imgur API.

## Task 2: A website with login

Consider a website like spotify, where the user can create their own playlists. The user however cannot create new songs or albums. Similar to task 1, above, you have to:

1. <strong>Plan</strong>: Draw an ERD to represent the data model of Spotify, making sure to include at least the entities `User`, `Playlist`, `Albums`, `Songs`, and considering any relationships.
2. <strong>Implement:</strong> Create a models/ folder, as you would if you were making a real app, and within this folder, create some files with the schemas and models you feel are necessary to implement your ERD.

## Task 3: Choose a website.

Consider any other website on the internet. 

1. <strong>Plan</strong>: Draw an ERD to represent the data model of your chosen website. Try to have less than 5 entities if you can. Make sure to include at least the entity `User`, and think about what data the user owns and does not own as you're drawing out the entities.
2. <strong>Implement:</strong> Create a models/ folder, as you would if you were making a real app, and within this folder, create some files with the schemas and models you feel are necessary to implement your ERD.
