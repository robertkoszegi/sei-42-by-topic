<img src="https://i.imgur.com/sA6iEbw.jpg">

# JavaScript Looping over Arrays Lab

## Introduction

This lab provides an opportunity to practice looping over arrays.

> **Note:** Feel free to reference the arrays lesson, collaborate, google, etc.

## Setup & Instructions

Create a new HTML/CSS/JS repl on [repl.it](https://repl.it) for these exercises.

Title your repl **JS Looping over Arrays Lab**.

Copy the exercises below into the repl's **script.js** file and code away!

This lab is **a DELIVERABLE**. When completed, submit the link to your repl to your instructors.

You don't need to complete all of these, but <strong>you must complete at least 5 of these exercises.</strong> I would strongly encourage you to attempt as many as possible though.

## Exercise

```
/*
Exercise 1: Printing arrays
  - Below, we've declared an array of numbers called "numbers" with the numbers 45, 13, 646, and 913
  - Using any type of loop (foreach, "for of", or a classic "for" loop), print to the console each individual element of the numbers array.
  - (hint: your loop block should probably use console.log to print out the current element as it loops through the array)
  - Note: although console.log(numbers) would print out the entire array, we want to see each individual element printed on separate lines
*/

// Complete Exercise 1 below...

let numbers = [45, 13, 646, 913]

// Write your loop code here
// to print out the stuff

/*
Exercise 2: Transform array elements individually
  - use the array map function to add 1 to all the numbers in the numbers array and 
  - save the resulting array in a variable called numbers1.
  - hint: an example can be found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  - and here https://edabit.com/tutorial/javascript#loops
*/

// Complete Exercise 2 below...

console.log('Exercise 2 Result:\n', numbers1);

/*
 Exercise 3: compare all elements to 500
  - Using a foreach or 'for of' or classic 'for loop', print out all elements in the numbers array that are greater than 500
  - (Hint: your loop block should probably contain an 'if-else' statement that checks if the current element is bigger than 500)
*/

// Complete Exercise 3 below...



/*
 Exercise 4: compare across elements while remembering something
  - Using a foreach or 'for of' or classic 'for loop', print out the biggest number in the numbers array
  - (Hint 1: declare a variable before the loop block called "greatestSoFar" and set it to 0. 
  -          This represents the biggest element we've seen so far as we walk through the loop)
  - (Hint 2: in your loop block, use an if statement to compare the current element to greatestSoFar. 
  -          If the current element is bigger than the greatest element we've seen yet, then update the 
  -          greatest element to be set to the current element.
  - (Hint 3: Once the loop has finished running through each element, hopefully our greatestSoFar variable contains
             the greatest element.)
*/

// Complete Exercise 4 below...

/*
 Exercise 5: operating across elements while remembering something
  - Using a foreach or 'for of' or classic 'for loop', print out the sum of the numbers in the numbers array
  - (Hint 1: declare a variable before the loop block called "sumSoFar" and set it to 0. 
  -          This represents the sum that we've seen so far as we walk through the loop)
  - (Hint 2: in your loop block, use a += statement to increment the sumSoFar by the current element)
  - (Hint 3: Once the loop has finished running through each element, hopefully our sumSoFar variable contains
             the sum.)
*/

// Complete Exercise 5 below...

/*
 Exercise 6: operating across elements and putting the lucky ones in a new array
  - Declare a new empty array called 'luckyNumbers'.
  - Using a foreach or 'for of' or classic 'for loop', put all numbers in the numbers array that have a value over 500 into the luckyNumbers array.
  - (Hint 1: declare the luckyNumbers array before the loop, and set it to empty array [])
  - (Hint 2: in your loop block, use some if logic to see if the current element is over 500. if it is, push it into the luckyNumbers array)
  - (Hint 3: Once the loop has finished running through each element, hopefully our luckyNumbers array contains the lucky numbers)
*/

// Complete Exercise 6 below...

/*
 Exercise 7: operating on some of the array elements
  - Declare an array of animals with exactly 10 animals in it
  - Print out the animals from index 3 to index 7 --- ie., not the entire array
  - (Hint: use a "classic for loop" - For this question, you may assume the array has exactly 10 elements, so you can iterate from index 0 to index 9)
*/

// Complete Exercise 7 below...

/*
 Exercise 8: classic for loop
  - Print out just the last 3 animals of the animals array. For this question, you may NOT assume the array has exactly 10 elements. Your code should handle any length array of animals.
  - (Hint: use a "classic for loop")
  - (Hint 2: you can iterate from index 0 to index animals.length and print)
*/

// Complete Exercise 8 below...

/*
 Exercise 9: try something fun!
  - Declare an array of some kind - eg., an array of animals? an array of fruits? an array of arrays?
  - Think about some kind of operation you'd like to do on the array, and try to implement it using any of the loop structures we've learned.
*/

// Complete Exercise 9 below...


/*
Exercise 10: 
  - Declare a new array called "foods" that contains an array of strings, and you get to decide whether to include the word soup.
  - Task: Assign a boolean to a variable named hasSoup depending upon whether or not the foods array includes the string 'soup'.
*/

// Complete Exercise 10 below...



console.log('Exercise 10 Result:\n', hasSoup);

/*
Exercise 11:
  - Use a 'for of' or 'foreach' loop to iterate through the provided nums array and add each odd number to a new array named odds.
  - Hint: Initialize the odds variable to an empty array before the iteration.
*/

const nums = [100, 5, 23, 15, 21, 72, 9, 45, 66, 7, 81, 90];

// Complete Exercise 11 below...



console.log('Exercise 11 Result:\n', odds);

/*
Exercise 12:
  - Use a 'for of' or forEach loop to iterate through the same nums array and add the number to arrays named fizz, buzz and/or fizzbuzz based upon the following:
  	- Add to the fizz array if the number is evenly divisible by 3.
  	- Add to the buzz array if the number is evenly divisible by 5.
  	- Add to the fizzbuzz array if the number is evenly divisible by 3 & 5.
*/

// Complete Exercise 12 below...



console.log('Exercise 12 Results:');
console.log('  fizz:', fizz);
console.log('  buzz:', buzz);
console.log('  fizzbuzz:', fizzbuzz);

/*
Exercise 13:
  - Given the below numArrays array of arrays (two-dimensional array), assign the last nested array to a variable named numList.
  - For an extra challenge, assume you don't know how many nested arrays numArrays contains.
*/

const numArrays = [
	[100, 5, 23],
	[15, 21, 72, 9],
	[45, 66],
	[7, 81, 90]
];

// Complete Exercise 13 below...



console.log('Exercise 13 Result:\n', numList);

/*
Exercise 14:
  - Given the above numArrays array, access the number 66 and assign to a variable named num.
*/

// Complete Exercise 14 below...



console.log('Exercise 14 Result:\n', num);

/*
Exercise 15:
  - Given the above numArrays array, use nested forEach or 'for of' methods to sum up all the numbers contained within numArrays and assign to a variable named total.
  - Hint: Be sure to declare and initialize the total variable before the iterations.
*/

// Complete Exercise 15 below...



console.log('Exercise 15 Result:\n', total);
```


## Additional Resources

- [MDN Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
