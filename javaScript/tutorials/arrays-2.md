
<img src="https://i.imgur.com/DEsPVNw.png" height="400">

# Looping over Arrays

---

## Learning Objectives
<br>

Students will be able to:

- Iterate Over All of the Elements in an Array
- Learn how to solve various problems using loops

---
## Roadmap
<br>
<p></p>

- Using Map and Filter for quickly transforming or filtering an array
- Iterating Over the Elements for more complex problems


## Loops

A loop allows you to iterate over every element of an array in order to do something useful. 

### Recap: Simple transforming and filtering.

Some simple to do common tasks include:

1. transforming all individual elements of an array in some way (eg., make everything uppercase)
2. filtering for elements that pass some kind of test (eg., keep elements that are greater than 5, and discard all others)

To learn how to do these operations, check out the syntax found here, and give the exercises a try:

<a href="https://edabit.com/tutorial/javascript#loops">Edabit: map and filter example</a>

### More interesting transformations

Some tasks require a more complex syntax - a 'for loop' - because we have to manipulate the values and the indices of the array. These tasks might include:

1. printing each individual element
2. interacting with multiple elements of an array to find the largest number (requires a temporary variable and an if statement in a for loop)
3. interacting with multiple elements of an array to sum all the elements together (requires a temporary variable and an assignment statement in a for loop)
4. anything involving a "grid" or a "2D array"

- To learn how to do these and more, let's continue onwards:


### Iterating Over All of the Elements in an Array
<br>

- ES2015 provides the `for...of` loop for iterating over the elements of arrays and other iterables such as strings. It lets us easily operate on each value within the array, ignoring the index:

	```js
	for(let movie of movies) {
		if (movie === 'The Last Airbender') break;
		console.log(movie);
	}
	``` 

- Unlike `forEach` (which we look at below), the `for...of` loop can be exited using the `break` statement.
- The downside of the 'for of' loop, though is that you have no access to the index of each particular item.

---
### Iterate Over All of the Elements in an Array
<br>

- Although a `for of` loop can be used to iterate over an entire array, if you need the index, the `forEach` method is another approach:

	```js
	movies.forEach(function(movie) {
		console.log(movie);
	});
	```


- Try it out. As you can see, the `forEach` method calls the function provided as an argument **once for each element** in the array.

---
### Iterate Over All of the Elements in an Array
<br>
	
- You can also access the index of each iteration:

	```js
	movies.forEach(function(movie, idx) {
		console.log(idx + ') ' + movie);
	});
	```

- Note that it's a good practice to name the parameter that accepts each element as the singular of the array, or simply the first letter of the array variable (`movie` or `m` for the example above).

### Iterate Over All of the Elements in an Array

- Another, more classic approach uses a 'classic' for loop, that is present in most programming languages. The classic 'for loop' has the most complicated syntax:

```js
let longest_movie_length = 0;
for (let i = 0; i < movies.length; i++) {
   if (movies[i].length > longest_movie_length) {
   	longest_movie_length = movies[i].length
   }
}
```

The classic 'for loop' however is the most powerful and least limited way to iterate over an array, and is well worth learning. For example, it allows us to investigate each movie in the movies array, check if it meets some condition, and do a calculation on it.

In this case, we're trying to find the longest movie by investigating each movie's length, checking if it's bigger than everything we've seen so far, and if it is indeed the biggest so far, we update a tracker variable:

```js
let longest_movie_length = 0;
for (let i = 0; i < movies.length; i++) {
   if (movies[i].length > longest_movie_length) {
   	longest_movie_length = movies[i].length
   }
}
```


---
### Essential Questions
<br>

- **In your own words, what's an array?**

- **What will be the value of the variable `color`:**

	```js
	const colors = ['red', 'green', 'blue'];
	let color = colors[1];
	```

- **What's the best method to use to iterate through an entire array?**

- **What method is used to copy a number of elements into a new array?**


---
### Further Study
<br>

- Because arrays are such a useful data structure, it's beneficial to developers to know what methods are available and what they do.

- Array iterator methods are extremely useful and we will cover them in a later lesson. Check [here](https://gist.github.com/jim-clark/843ebb5288d90da6b0dfd9eecd134b7c) for a preview.

- Other useful methods worth knowing about:
	- `indexOf` / `lastIndexOf`
	- `includes`
	- `reverse`
	- `sort`

---
### References
<br>

[MDN - JavaScript Arrays
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

