# Decorators

Decorators are a way to add extra functionality to an existing function in Python without explicitly modifying it. You can identify a decorator, because it is prefixed with an `@` symbol. They provide a simple syntax for calling higher-order functions.

## Passing functions by reference

In order to understand how to create decorators, it's important to understand that functions can be passed to other functions _by reference_, eg: as arguments.

Actually this should be a fairly simple concept for anyone coming from JavaScript, because JavaScript works in exactly the same way. In JavaScript we can pass a function to another function as an argument. In JavaScript, we call this a _callback_.

Let's look at an example:

```py
def hello(name):
  return f'Hi there, {name}'

def emphatic_hello(name):
  return f'{name.upper()}! How the devil are you!'

def greet_sabrina(callback):
  return callback('Sabrina')

greet_sabrina(hello) # Hi there, Sabrina
greet_sabrina(emphatic_hello) # SABRINA! How the devil are you!
```

As you can see `greet_sabrina` will call whichever function is passed to it. It will then call that function back, passing in the name Sabrina. So in the example above `hello`, and `emphatic_hello` are both callback functions.

## Inner Functions

With Python, it is possible to define functions inside of other functions. They are referred to as inner functions.

```py
def outer():
    print("I'm outer")

    def inner_one():
        print("Inner one function")

    def inner_two():
        print("Inner two function")

    inner_one()
    inner_two()
```

If we called the `outer()` function, it would print:

```
I'm outer
Inner one function
Inner two function
```

The inner functions are only within the scope of the outer function.

## Returning functions from functions

Because functions can be passed around like variables, this means we can also return functions from functions. Here's an example:

```py
def weight_converter(unit):
  def lbs_to_kgs(amount):
    return amount * 0.453592

  def kgs_to_lbs(amount):
    return amount * 2.20462

  if unit == 'lbs':
    return lbs_to_kgs
  else:
    return kgs_to_lbs


converter = weight_converter('lbs')

converter(18) # 8.164656
```

In the example above the `weight_converter` function will return either the `lbs_to_kgs` function or the `kgs_to_lbs` function depending on the argument passed. The returned function is then stored in the `converter` variable, in this case `lbs_to_kgs`. This is similar to the closures we saw in javascript.

## A simple decorator

Let now actually make a decorator. Decorators can be made to do anything, that normally means adding some logic to an existing function. We'll make a decorator which calls a function twice:

```py
def do_twice(func):
  def wrapper():
    func()
    func()

  return wrapper
```

Here we have made a function `do_twice` which takes a callback. It then returns a function called `wrapper`, which when called, will run the callback function twice.

Here's how we could use it:

```py
def say_hello():
  print('Hello!')

say_hello = do_twice(say_hello)

say_hello()
# Hello!
# Hello!
```

So we have decorated our `say_hello` function with the `do_twice` decorator. Now its behaviour has changed.

Because this is a very common pattern in Python, there is a more elegant way of using a decorator. The example above can be re-written as follows:

```py
@do_twice
def say_hello():
  print('Hello!')

say_hello()
# Hello!
# Hello!
```

By prefixing the method with a `@` symbol, Python knows that we want to use it as a decorator. The function defined immediately below the decorator is upgraded with the decorator's functionality.

## Passing arguments

Let's look at a slightly more complex example, where we actually want to pass an argument to the decorated function:

```py
@do_twice
def say_hello(name):
  print(f'Hi there {name}')

say_hello('Isabelle')
```

Here we get an error.

```sh
TypeError: wrapper() takes 0 positional arguments but 1 was given
```

This is because `do_twice` has returned the `wrapper` function we wrote inside, which is now being called when we call `say_hello`. We need to update our `do_twice` method like so:

```py
def do_twice(func):
  def wrapper(*args, **kwargs):
    func(*args, **kwargs)
    func(*args, **kwargs)

  return wrapper
```

Here any arguments that are given to `wrapper` are immediately passed down to the original function.

> **Note**: `*args` will collect any positional arguments, and `**kwargs` will collect any keyword arguments.

Let's try that again:

```py
@do_twice
def say_hello(name):
  print(f'Hi there {name}')

say_hello('Isabelle')

# Hi Isabelle
# Hi Isabelle
```

## Returning values from decorated functions

It is up to the decorator to decide what happens to the return value of the decorated function. For example, let's say you want to return a greeting from a function decorated with `@do_twice`.

```py
@do_twice
def return_greeting(name):
    print("Creating greeting")
    return f"Hi {name}"
```

```bash
>>> hi_james = return_greeting('James')
Creating greeting
Creating greeting
>>> print(hi_james)
None
```

Notice how the `return_greeting()` function ended up returning None, because the `wrapper()` function in `@do_twice` does not explicitly return anything. We would have to modify our decorator to explicity return what is returned from our decorated function.

```py
def do_twice(func):
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        return func(*args, **kwargs)
    return wrapper
```

## Wrapping up

One final thing: our decorated `say_hello` function is now actually the `wrapper` function from the `do_twice` decorator, which is not ideal. This might get confusing if we were to try to debug our code at a later date.

Let's ask `say_hello` what it's name is:

```py
@do_twice
def say_hello(name):
  print(f'Hi there {name}')

say_hello.__name__ # 'wrapper'
```

This is referring to the `wrapper` function inside the `do_twice` function.

To rectify this, we can use a special in-built Python decorator, designed specifically for this situation:

```py
from functools import wraps

def do_twice(func):
  @wraps(func) # use the wraps decorator from Python's functools module
  def wrapper(*args, **kwargs):
    func(*args, **kwargs)
    func(*args, **kwargs)

  return wrapper
```

With our new `do_twice` decorator in place, let's now check on the name of our `say_hello` function:

```py
@do_twice
def say_hello(name):
  print(f'Hi there {name}')

say_hello.__name__ # 'say_hello'
```

Perfect!

You will see decorators being used in many python libraries and frameworks. Many decorators are going to follow the same pattern, looking something like this:

```py
from functools import wraps

def decorator(func):
    @wraps(func)
    def wrapper_decorator(*args, **kwargs):
        # Do something before
        value = func(*args, **kwargs)
        # Do something after
        return value
    return wrapper_decorator
```

## Further reading

* [Primer on Python Decorators - Real Python](https://realpython.com/primer-on-python-decorators/)
* [@decorators in Python - Hacker Noon](https://hackernoon.com/decorators-in-python-8fd0dce93c08)
* [Python Decorators - Programiz](https://www.programiz.com/python-programming/decorator)