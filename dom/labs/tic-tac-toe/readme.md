![](https://lh4.ggpht.com/bjuK8Xe0G8WJ1583yP_5RV6_ylS-c_MsF2O3g4XjZ4Dm4ttgWmcu1BqqUrZyI9uDtMk=w300)
# Partner Lab: Tic-Tac-Toe Weekend
---

## Objective

With your partner, build a Tic-Tac-Toe game incorporating the web technologies and techniques you've worked with thus far:

- HTML
- CSS
- JavaScript
- DOM Manipulation

Use the <a href="../guide-to-building-a-browser-game.md">Guide to Build a browser game</a> for help!

## This Assignment is a Deliverable

Commit and push the code to a new repo in your personal GitHub account - see below on how to create a new repo.

Submit the link to your repo using the Deliverable Submission form linked to in the class repo's README.

## Github Step 1: How to Create a New Repo

1. Browse to your personal GitHub account, click on `Repositories` and click the green `[New]` button.

2. Name the repo and ensure that **Public** is selected and that **Initialize this repository with a README** is un-checked  (you can always add one manually later):

	<img src="https://i.imgur.com/WXxIvDz.png">

3. After clicking the green `Create repository` button, copy the new repo's URL by clicking the clipboard button:

	<img src="https://i.imgur.com/KMm8Zq5.png">
	
4. Ensure that you're in your `~/code` folder then clone the repo:

	```sh
	git clone <paste the repo's URL here>
	```
	
5. Lastly, move into the the newly created folder named the same as the repo, e.g., `cd tic-tac-toe`.  You're ready to start coding!

#### Github Step 2: Saving Your Work to the Repo

As always...

1. `git add -A` or `git add .`

2. `git commit -m "Msg stating what the commit WILL do (present, not past-tense)"`

3. `git push -u origin master` (the first push), then just `git push` from then on thanks to the `-u` option.
 
## Minimum Requirements
- Display an empty tic-tac-toe board when the page is initially displayed.
- A player can click on the nine cells to make a move.
- Every click will alternate between marking an `X` and `O`.
- Once occupied with an `X` or `O`, the cell cannot be played again.
- Provide a `Reset Game` button that will clear the contents of the board.
- You can definitely research implementing DOM Events like "click" functionality in general, but:
- Please <strong>do NOT use an online tutorial on how to make Tic Tac Toe</strong>, and we require that you <strong>avoid following an online tutorial on TTT</strong>. Not only is plagiarism not permitted, but following a tutorial has several negatives:
	1. it will decrease your self-confidence because you will think you have to rely on how <strong>they</strong> do it.
	2. you may not end up learning how to build a browser game. 
	3. Tutorials often use complex code, at a level we're not at yet. They can use needlessly confusing structures (spread operator! objects inside objects! 3D arrays!) and may influence you into thinking the task is harder than it really is. 
	4. Try to figure it out on your own with your partner. <strong>The process of struggling through a task is one of the most important things, and the end result is not necessarily as important.</strong>


### Getting Started / Hints

- **Follow the approach as described in the <a href="../guide-to-building-a-browser-game.md">_Guide on How to Build a Browser Game_</a>**.
- Create an `index.html` page.
- Create and include in your `index.html` page, `main.css` and `main.js` files.
- Start by writing the HTML and CSS that displays a 3x3 grid and the `reset game` button.
- Using `id` and/or `class` attributes will help you target elements for styling and wiring up your click event listeners.
- Programs, including games, are frequently focused on manipulating data and displaying that data to a user. Decide on the data structures, held in variables, that will maintain the _state_ (data / status) of the game.
- Note that the values you use to represent the state of your game, doesn't necessarily have to match what you want to display.  For example, just because you want to display X and Os doesn't mean that you have to use those letters in your data structure.  You might choose to use 1 to represent player X and -1 to represent player O for example.  Then, in your _render_ function you would have the logic to translate data to what you want to display.
- Wire up your click event listener(s). Using a single listener with event bubbling is recommended but not required.
- Lots of little functions!

### Pseudocode

Pseudocode is a detailed description of what an application must do, written in natural language instead of a particular programming language.

Well-written pseudocode should be easily translated into actual code.

The best way to get started is to start with the "big picture" of what the app needs to do:

```
1) Define required constants

2) Define required variables used to track the state of the game

3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.

4) Upon loading the app should:
	4.1) Initialize the state variables
	4.2) Render those values to the page
	4.3) Wait for the user to click a square

5) Handle a player clicking a square

6) Handle a player clicking the replay button
```

Since most web apps are event-driven by nature. Coding an event-driven program generally requires that we set up the application when it loads (steps 1 - 4) and wait for the user to interact with the app (steps 5 & 6).

Now we can start adding as many detailed steps as desired.

Typically, pseudocode does not have to be as detailed as the following - it is highly detailed here to help you as much as possible. It's you basically trying to write out how your game will work based on your understanding of the computer state and user interactions:

```
1) Define required constants:

2) Define required variables used to track the state of the game:
	2.1) Use either 3 arrays representing 3 "rows", or 9 variables each representing 9 "squares", or one 2D "board" array to represent the squares.	
	2.2) Use a variable to remember whose turn it is.
	2.3) Use a variable to represent three different possibilities - player that won, a tie, or game in play.

3) Store DOM elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant:
	3.1) Depending on our choice of how we're representing the state of the game, we can either store/cache the 9 DOM elements (eg., divs) that represent the squares on the page, or we can store the div containing the 2D array. For example, let square1 = document.getElementById("square1") or let myGrid = document.getElementById("board") or let winMessageDiv = document.getElementById("winMessageDiv"), so that we can later just modify the square visually by doing things like myGrid.addEventListener("click", ...)  or   square1.innerHTML = "X" or any other UI update.

4) Upon loading the app should:
	4.1) Initialize the state variables:
		4.1.1) Initialize "board" array or "rows" array or 9 "squares" variables to somehow represent empty squares.
		4.1.2) Initialize turn variable representing whose turn it is first. We can use numbers 1 and -1 to represent the two players, or we can use "O" and "X" as strings.
		4.1.3) Initialize our winner variable to indicate that there is no winner or tie yet and the game is in progress. Decide how this variable will work. Maybe "-1" can mean that "O" has won? Or maybe "O" can represent that "O" has won. Maybe "T" can represent there is a tie. Maybe "?" or "None" or "null" can mean there is no winner or tie yet. We have lots of options.
	4.2) Render those state variables to the page:
		4.2.1) Render the board, with a render() function that is called (1) once when the game starts, and then (2) afterwards is either called every half second by itself, or is called  every time a player clicks anywhere. The render() function should:
			4.2.1.1) Update the user interface visually based on the data stored in our state variables. For example, if our state variables indicate that row 1 column 1 has a "O" in it, then our render function should draw an "O" visually there using the DOM.
		4.2.2) Render a message:
			4.2.2.1) If the "winner" variable has a value, render it visually
			4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
			4.2.2.3) If somebody has won, render a congratulatory message to which player has won.
	4.3) Wait for the user to click a square

5) Handle a player clicking a square:
	5.1) If our winner variable indicates that somebody has won, don't do anything. We don't want to update any variables if someone's won, or if it's a tie.
	5.2) Our event listener(s) should help us figure out which square was clicked by the player. 
	5.3) Check our variable or array element corresponding to the clicked square. If our variable corresponding to the clicked square already has a value, don't do anything. We don't update a square if it already has a value.
	5.4) If our variable or array element doesn't already have a value, update it to indicate that it was clicked by the current player.
	5.5) Update the turn variable to indicate that it is the next player's turn.
	5.6) Set the winner variable if there's a winner. Check your 9 variables, or your 3 arrays, or your one 2D-array for any rows, diagonals, or columns that have the same player. If there is, set the winner variable to indicate who won. If there isn't, don't modify the winner variable.
	5.7) If there's no winner, check if there's a tie
	5.8) All state has been updated, so render the state to the page (step 4.2).
		

6) Handle a player clicking the replay button:
	6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).
```

Using a numbered outline is not required but helps organize the more complex steps into detailed steps. You will be doing this in your project 1 as well.

## Bonuses
- Display whose turn it is ("X" or "O").
- Provide win logic and display a winning message.
- Provide logic for a cat's game (tie), also displaying a message.
- Add your personal touch with unique styling.

## Resources

[DOM Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)

