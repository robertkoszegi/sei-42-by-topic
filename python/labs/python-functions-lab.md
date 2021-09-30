<img src="https://i.imgur.com/Q5SFLV2.png">

# Python Function Lab

## Intro

Time to practice some Python by writing functions that solve the four challenges below.

To test your functions, be sure to call each function at least once and `print` the returned value.

##### This Lab is a Deliverable

## Set Up

You may write the functions in a `.py` file or use a Python repl in repl.it

## Part 1: 6 Questions to build intuition about functions (These are optional to attempt - but will count if you do them!)

1. <strong>(Concept: Calling a function that has already been defined.)</strong><br> The following function definition defines a function called `pokemon_contains` that will tell you if a single `incoming_letter` passed into this function exists in the word "pokemon". This function returns a <strong>boolean</strong> (ie., True or False). Your task is to first, copy this function and then call this function by passing in the letter "k". Store the result of this function call in a variable called result1. Print out the result. Secondly, call this function by passing in the letter "o". Store the result of this function call in a variable called result1. Print out the result.

	```python
	def pokemon_contains(incoming_letter):
		if incoming_letter in "pokemon":
			return True
		else:
			return False
	```

2. <strong>(Concept: Calling a function that has already been defined.)</strong><br> Below we are defining a function to sum two numbers. Right below that, we are calling this function two times, but we have made a mistake while calling the function the first time. What's the mistake? Fix it.

	```python
	def sum_two(a,b):
		answer = a + b
		return answer
		
	result3 = sum_two(a,b)
	print(result3)
	result4 = sum_two(5,6)
	print(result4)
	```

3. <strong>(Concept: Defining a function)</strong><br> Below we are defining a function to multiply two numbers. After that, we are calling this function two times, and storing the results in variables. But this is failing due to a mistake while defining the function. What's the mistake? Fix it.

	```python
	def multiply(num1,num2):
		answer = a*b
	
	result5 = multiply(10,10)
	print(result5)
	result6 = multiply(5,6)
	print(result6)
	```

4. <strong>(Concept: Functions are not executed until called.)</strong><br>If we run the program below, in what order will the 3 print statements be executed? Before you submit your answer, verify your theory by running your code, and also by trying it in the <a href="http://pythontutor.com/visualize.html#mode=edit">python visualizer</a>.
	```python
	def multiplication(a,b):
		my_answer = a*b
		print("Calculating...")
		return my_answer
	
	print("Let's Multiply stuff...")
	answer = multiplication(5,6)
	answer = str(answer)
	print("The answer is..." + answer)
	```

5. <strong>(Concept:Define a function).</strong><br> First, define a function called `subtract` that accepts two parameters and will subtract the second parameter from the first. Secondly, call this function at least two times and plug in various numbers, and print out the result both times. If your code doesn't work, try it in the <a href="http://pythontutor.com/visualize.html#mode=edit">python visualizer</a>

6. <strong>(Concept: Defining a function).</strong><br> First, Define a function called `greater_than_5` that accepts one parameter will return True if the incoming input is greater than 5, and returns False if the incoming is less than or equal to 5. Secondly, call this function at least two times and print out the result both times.



## Part 2: 4 Questions to challenge you. (These are mandatory to at least attempt. Even if you don't get them, try to get as close as you can!)

7. Write a function named `sum_to` that accepts a single integer, `n`, and returns the sum of the integers from 1 to `n`.

	For example:

	```python
	sum_to(6)  # returns 21
	sum_to(10) # returns 55
	```

	<i>(Hint 1: if you're having trouble, try to do it without a function first.)<br>
	(Hint 2: You will need to <strong>define</strong> a function of the form <strong>def sum_to(</strong>...) and then you can call the function with various inputs for the arguments such as 6 and 10, as shown in the examples above.<br>
	(Hint 3: Your <strong>function definition</strong> will require parameters to act as a placeholder for the incoming input. How many parameters will you need?)<br>
	(Hint 4: In your function <strong>definition</strong>, you will need a <strong>for in range</strong> loop going from 1 to some number `n` that your function should receive as an incoming parameter.)<br>
	(Hint 5: If your code isn't working, try the <a href="http://pythontutor.com/visualize.html#mode=edit">python visualizer</a>. )
	</i>

8. Write a function named `largest` that takes a list of numbers as an argument and returns the largest number in that list.

	For example:
	
	```python
	largest([1, 2, 3, 4, 0])  # returns 4
	largest([10, 4, 2, 231, 91, 54])  # returns 231
	```

9. Write a function named `occurances` that takes two string arguments as input and counts the number of occurances of the second string inside the first string.

	For example:

	```python
	occurances('fleep floop', 'e')   # returns 2
	occurances('fleep floop', 'p')   # returns 2
	occurances('fleep floop', 'ee')  # returns 1
	occurances('fleep floop', 'fe')  # returns 0
	```

10. Write a function named `product` that takes an *arbitrary* number of numbers, multiplies them all together, and returns the product.<br>(HINT: Review your notes on `*args`).

	For example:
	
	```python
	product(-1, 4) # returns -4
	product(2, 5, 5) # returns 50
	product(4, 0.5, 5) # returns 10.0
	```

