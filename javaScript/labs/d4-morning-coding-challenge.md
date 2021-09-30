![](https://i.imgur.com/hGEeDR1.png)

# JavaScript Basics <br> Morning Coding Challenge

## Intro

Yesterday you officially became a coder. You can now:

1. declare variables that contain strings, numbers and arrays
1. write IF statements and logic, and
1. write loop logic to repeat your code over and over (and over) and over again.

Let's get some additional practice with these topics.

## Setup

Your instructor will place you into random breakout rooms. 

For each the following tasks, 
* <b>FIRST</b>: discuss with your partner what you think the answer will be. 
* <b>SECOND</b>: have one of you (maybe the less expert partner) code it on <a href="https://repl.it">repl.it</a> or <a href="https://codepen.io">codepen.io</a> with the screen share on (driver) while you both discuss (navigator). 

This way, the more experienced partner can benefit from trying to explain concepts, and the less experienced partner can learn from your peer. Everybody wins!

## Task 1:  Rock Paper Scissors (single round version)

Have one partner open a new repl.it for HTML/CSS/JS and, working together, write some code to do the following:

1. using a javascript prompt(), ask player one to guess either the word "rock" or "paper" or "scissors" and store their guess in a variable called player_one_choice
1. using a javascript prompt(), ask player two to guess the word "rock" or "paper" or "scissors" and store their guess in a variable called player_two_choice
    * if you get stuck, you can find a hint <a href="d3-morning-coding-challenge-hint1.md">here</a>.
1. Next, write some code using "if" and "else if" statements to do the following logic:
    1. if player one's guess is equal to player two's guess, alert("tie game!")
    1. otherwise, if player one's guess is "rock" and player two's guess is "scissors", alert("player one wins")
    1. otherwise, if player one's guess is "rock" and player two's guess is "paper", alert("player two wins")
    1. ... fill out the rest of the logic for player one paper, and player one scissors (4 conditions)

## Task 2: Rock Paper Scissors (multi-round version)

Take your rock paper scissors logic from the previous task, and wrap it in a loop such that

   1. the players are asked to guess "rock" or "paper" or "scissors"
   2. the alert gives them the answer
   3. step 1 and 2 are repeated

If you get stuck, make sure to double check your logic and your syntax, and refer to the in-class examples from yesterday. You can also ask your instructor for help.

<hr>

#### If you're done Task 2, and some of your classmates are still working on Task 1, feel free to try these bonus activities before your instructor closes the rooms:

## Task 3: RPS Points (Bonus) (Optional)

1. Modify your rock paper scissors game to display, after each round,  the number of points that each player has. (You can display this either in the console, or via an alert.)

## Task 4: Tic-Tac-Toe (Bonus) (Optional)

Make a text-based tic tac toe game!

1. Declare some appropriate variables, or an array, or 3 arrays (whatever you like) to store the state of a tic-tac-toe game
1. Declare another variable to store who is the currentplayer, and set this to "X" by default.
1. Write a loop that will run forever and that will do the following steps:
    1. Prompt the current player to enter the name of a square they want to hit. (It's up to you to decide how to name the squares - maybe the current player can type "top left" or maybe they can type "0,0" - whatever you like)
    1. Update and display the game board with their choice. (You could probably display this with 3 console.logs that represent the game board in 3 lines)
    1. If the current player was "X", change the current player to "O". If the current player was "O", change the current player to "X"
    1. Alert something if somebody wins
