![](https://i.imgur.com/hGEeDR1.png)

# JavaScript Functions Lab

## Introduction

This lab provides an opportunity to practice defining and coding some real-world functions. Function expressions are covered in the notes, but function declarations can be used instead if you feel more comfortable.

> **Note:** Feel free to work in pairs to complete this lab. Also, Google/StackOverflow is a good friend to have around...

## Exercise

#### Setup & Instructions

Create a new HTML/CSS/JS repl in [repl.it](https://repl.it) for these exercises.

Title your repl **JS Function Lab**.

This lab is **a deliverable**.

#### Requirements

Complete at least 9 of the exercises below. The first 6 are optional questions to build intuition about functions, but will count if you do them.

Be sure to number each function with a comment above it.

## Part 1: 6 Questions to build intuition about functions (These are optional to attempt - but will count toward your 9 if you do them!)

1. <strong>(Concept: Calling a function that has already been defined.)</strong><br> The following function definition defines a function called `pokemon_contains` that will tell you if a single `incoming_letter` passed into this function exists in the word "pokemon". This function returns a <strong>boolean</strong> (ie., True or False). Your task is to first, copy this function and then <strong>call</strong> this function by passing in the letter "k". Store the result of this function call in a variable called result1. Print out the result. Secondly, <strong>call</strong> this function by passing in the letter "o". Store the result of this function call in a variable called result2. Print out the result.

```js
function pokemonContains(incomingLetter) {
  if ("pokemon".includes(incomingLetter)) {
    return true;
  } else {
    return false;
  }
}
```

2. <strong>(Concept: Calling a function that has already been defined.)</strong><br> Below we are defining a function to sum two numbers. Right below that, we are calling this function two times, but we have made a mistake while calling the function the first time. What's the mistake? Fix it.

```js
function sumTwo(a,b) {
  let answer = a + b
  return answer
}
		
let result3 = sumTwo(a,b)
console.log(result3)
let result4 = sumTwo(5,6)
console.log(result4)
```
  
3. <strong>(Concept: Defining a function)</strong><br> Below we are defining a function to multiply two numbers. After that, we are calling this function two times, and storing the results in variables. But this is failing due to a mistake (actually, two) while defining the function. What's the mistake? Fix it.

```js
function multiply(num1,num2) {
  let answer = a*b
}

let result5 = multiply(10,10)
console.log(result5)
let result6 = multiply(5,6)
console.log(result6)
```

4. <strong>(Concept: Functions are not executed until called.)</strong><br>If we run the program below, in what order will the 5 console.log statements be executed? Write down your theory as a js comment, and then verify your theory by running your code, and also by trying it in the <a href="http://pythontutor.com/javascript.html#mode=edit">js visualizer</a>. Was your theory correct?

```js
function multiplication(a,b) {
  let myAnswer = a*b
  console.log("Calculating...")
  return myAnswer
}

console.log("Let's Multiply stuff...")
let answer = multiplication(5,6)
console.log("Let's Multiply more stuff...")
let answer2 = multiplication(5,6)
console.log("The answer is..." + answer)
console.log("The answer is...", answer2)
```

5. <strong>(Concept:Define a function).</strong><br> First, define a function called `subtract` that accepts two parameters and will subtract the second parameter from the first. Secondly, call this function at least two times and plug in various numbers, and print out the result both times. If your code doesn't work, try it in the <a href="http://pythontutor.com/javascript.html#mode=edit">js visualizer</a> to help you debug it.

6. <strong>(Concept: Defining a function).</strong><br> First, Define a function called `greaterThan5` that accepts one parameter will return true if the incoming input is greater than 5, and returns false if the incoming is less than or equal to 5. Secondly, call this function at least 3 times and print out the result of each call separately.


## Part 2: 9 Questions to test you. (In total you must complete at least 9 exercises across parts 1 and parts 2. We recommend you try them all though to test your weaknesses!)

#### Part 2 requirements
Define the functions using the approach as specified (either as a function expression or declaration).

After each function, call it **at least once** and `console.log` the results.

For example, here's the 7th function, our gift to you:

```js
// 6. ....

// 7.
function maxOfTwoNumbers(x, y) {
  if (x >= y) {
    return x;
  } else {
    return y;
  }
  
  // or more "elegantly" using the fantastic ternary expression!
  // return  x >= y ? x : y;
}

console.log(maxOfTwoNumbers(3, 9));

// 8.
...
```

Be sure to number each function with a comment above it.

Here are the functions:


7. (_completed above_) Define a function, as a function declaration, `maxOfTwoNumbers` that takes two numbers as arguments and returns the largest of them. If they are the same, return that number. Use the if-else construct or a ternary expression -  the Math.max method is not allowed.

8. Define a function, as a function expression, `maxOfThree` that takes three numbers as arguments and returns the largest of them. Again, the Math.max method is not allowed.

9. Define a function, as a function declaration, `isCharAVowel` that takes a character as an argument and returns true if it is a vowel, false otherwise.

10. Define a function, as a function expression, `sumArray` that takes an array of numbers and returns the sum of those numbers. For example, `sumArray([2, 4, 5]);` would return `11`.

11. Define a function, as a function declaration, `multiplyArray` that takes an array of numbers and returns the product those numbers. For example, `multiplyArray([2, 4, 5]);` would return `40`.

12. Define a function, as a function expression, `numArgs` that returns the number of arguments passed to the function when called.

13. Define a function, as a function declaration, `reverseString` that takes a string, reverses the characters, and returns it. For example, `reverseString('rockstar');` would return the string "ratskcor".

14. Define a function, as a function expression, `longestStringInArray` that takes an array of strings as an argument and returns the length of the longest string.

15. Define a function, as a function declaration, `stringsLongerThan` that takes an array of strings and a number as arguments; and returns an array of the strings that are longer than the number passed in. For example, `stringsLongerThan(['say', 'hello', 'in', 'the', 'morning'], 3);` would return `["hello", "morning"]`.

## Additional Resources

- [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
