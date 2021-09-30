## Intro

In the last lesson you saw how to use HTML forms and Express middleware, such as:

- `express.urlencoded` (AKA body-parser middleware)
- `method-override`

to perform **Create**, **Update** & **Delete** data operations in an Express application.

This lab builds upon the `express-dev-skills` project you created in the _My Dev Skills - Part 1_ lab where the **Read** data operation was implemented.

### Tasks

1. On the **show** view, display a _Delete Skill_ link that when clicked, deletes the skill from the "database" and redirects to the **index** view.

Note: All routes should follow those described in the [RESTful/Resourceful routing chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6)

2. On the **show** view, display an _Edit Skill_ link that when clicked, displays an **edit** view that displays a form for editing that Dev Skill.

3. When the edit Dev Skill form is submitted, the skill should be updated in the "database" and redirect the user back to the **show** view.

##### Hints

- Be sure to install, require & mount the `method-override` middleware.

##### Hints

- The controller action will need to get the Dev Skill being edited using the `Skill` Model and pass it to the **edit** view.
- Pre-fill `<input>` elements by using the `value` attribute and some EJS tags to write out the data properties of the skill passed in.

### This Lab is a Deliverable

- Commit your work to a repo named `express-dev-skills`
- Submit the link to your repo using the form as directed in the class repo's readme.