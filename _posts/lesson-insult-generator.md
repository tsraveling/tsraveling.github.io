
# Lesson 1: Insult Generator

**Project Requirement:** Create a small Javascript function that generates random insults. We're just looking to get the text for now; actually using and displaying the insults can come later.

## Setup

First, you need a **development environment**. Sites like [JSFiddle](http://jsfiddle.net/) can help you test a script in real time and are worth playing around with. However, I'd start with a good free tool you can install on your computer. [Visual Studio Code](https://code.visualstudio.com/) is a good choice.

Once you have that downloaded, create a file called `insult-generator.js`, and put this in it:

```
console.log("Hello, world!");
```

Congrats! You've created your first line of code.

**Note:** The semicolon denotes the end of a command. You generally need these on the end of every line that actually does something, such as our `console.log` statement in the example here.

## The Console

Javascript's primary function is interfacing with web sites, which are structured in **HTML** and styled with **CSS**. We might get into those at a later date, but for now, we're just concerned with the JS code itself. To that end, we have a tool called the **developer console**. Most browsers have this hidden in a menu somewhere, which you might want to look into on your own, but for now we can use the console included with VSC.

You can run your file in the dev console by going to `Debug/Start Debugging` in the menu or by hitting F5. When you do that you will see some text at the bottom of VSC that says `Debugger Attached` followed by the output of your first program: `Hello, world!`

## Intro to Architecture

The way you organize your code is called **architecture**. It's not super important for a small script like this, but it's good to start learning about it right away, because when you're working with a project that has hundreds of code files and tens of thousands of lines of code, it becomes critical.

Javascript is, as the name implies, a **scripting** language. That means that when you "run" a JS script, it will perform the commands in the script starting from the top and going down. If you add another `console.log` command to your script, you can see this in action in the console.

This can get messy fast, so we're going to organize our code using one of the most fundamental pieces of the programmer's toolset: **functions**.

## Functions

A **function** gets its name from the math equivalent, but is a little different. Think of it as a block of code that you can run whenever you want to. Some functions return values the way a math function does, but not all. For instance, try this out:

```
function exampleFunc() {
    console.log("This is from inside a function!");
}

exampleFunc();
```

The function is **defined** by the keyword `function` followed by the function's name. Function names are always alphanumeric. The `()` brackets are for containing arguments, which we'll get to in a second. The `{}` curly brackets wrap the code the function contains. A function is called by using the function's name and parentheses, as above: `exampleFunc()`.

A function can be defined anywhere within the script. If you change your code file to this:

```
exampleFunc();

function exampleFunc() {
    console.log("This still works!");
}
```

Note that because the function is a **definition** rather than a command, there are no semicolons following either the initial function declaration line (`function exampleFunc() {`) or the closing curly bracket.

This simple example begins to illuminate our simple project architecture. The code within the script itself -- ie, everything outside of function declarations, with no indentation -- runs from top to bottom. And within a function, code runs from top to bottom. But the code within a function will **only** ever run when that function is **called.**

## Arguments and Return Values

In addition to serving as ways to organize and reuse blocks of code, functions can also take **arguments** and **return values**. Take a look at this function:

```
function addWordsTo(text) {
    return "Here is " + text + " with some extra words!";
}

console.log(addWordsTo("a panda bear"));
```

The **variable** in parentheses (`text`) can be whatever you want. Javascript is not a **strong typed** language -- that means a variable can be a string (aka a sequence of letters and characters, enclosed by double quotes) or a number or whatever. However, to stay organized, try to act like the type is always expected. The function above always expects a string.

The **return value** is sent by the keyword `return`. `return` marks the actual end of the function. In a function that does not return a value, you can just put `return;` and that will end the function there. This is extremely useful, as you'll find down the road, but for now you don't have to worry about it too much.

So basically, a function *can* take one or more inputs, and *can* return a value. Note that the return value also has a type, in this case, a string. If instead of the `console.log` line you put this:

```
var a = addWordsTo("a panda bear");
```

Then this would assign the return value of `addWordsTo` to the new variable `a`. You could then, if you wanted to, do `console.log(a);` to output the contents of `a` to the console, or even do `a = addWordsTo(a)` to recursively apply your function to the result of the function again! 

Note: the `var` keyword defines a variable when you are creating it. After that, you can assign it whenever you want, because it already exists. So you can do:

```
var a = "thing one";
a = "thing two";
console.log(a);
```



Note that `console.log` is itself a function -- it's a **library** function that's included with Javascript for your convenience.

## Stubbing Out the Insult Generator

Building out your architecture when you're creating a project usually involves **stubbing out** bits of functionality you need but are going to develop later. Let's start our actual project by erasing everything you have in your file so far and creating your insult generator function, and logging the output of that function to the console.

```
function generateInsult() {
    return "Ur a dumbhead";
}

console.log(generateInsult());
```

That `console.log` call is the only script-level command we'll be using; everything else happens in functions. Doing things this way means maximising the reusability of your code and keeping things organized. Get in the practice of doing this now and it will save you literal months of headache down the road.

## Documentation and Comments

Most programmers are lazy. They write their code because, in the moment, they know what they're doing. Then they come back to it six months later and are lost because they no longer remember what it does. You can solve this problem by using **code comments**. Comments are defined by prefixing them with this: `//`. They are used to leave notes to yourself and describe what we're doing. Let's look at our updated code:

```
// This function returns the insult we're generating.
function generateInsult() {

    // TODO: Replace this with an actual insult generator.
    return "Ur a dumbhead";
}

// Print the output of the generator to the console.
console.log(generateInsult()); // Note: you can also put comments after a semicolon.
```

In my experience, it's always better to overdo comments than skimp on them. It also helps you organize your own headspace when you are architecting a problem.

## Working With Strings

Fortunately, Javascript makes working with strings very easy. Right now, the only thing we need to know how to do is concatenate them -- add them together. For instance, `var a = "This " + "is a full sentence";` creates the full string `This is a full sentence`. Strings are always contained either in double quotes (`"`) or single quotes (`'`). There are ways to include quote characters within your strings, but you don't have to worry about that for now.

For this project, we just need to know string concatenation, but if you want to branch out on your own, [W3Schools has a great overview of stuff to do with strings in JS](https://www.w3schools.com/jsref/jsref_obj_string.asp).

## Architecting the Problem

Problems in programming boil down to how to get your piece of software to meet the **requirements** determined by you or by your client. Clear understanding of requirements is one of the most important things a programmer can pursue. Lack of clarity when it comes to requirements results in wasted time and money, angry clients, and muddy architecture.

In this case, the requirement was defined at the top of a lesson. The next step is to break that down. In this case, we're going to solve our requirement by using a Mad-Libs-style string concatenation function -- let's say, "You are a {adjective} {noun} who {verb} {plural noun}!"

Note: you can see a more complicated, and often profane, example of this an action in my Twitter bot [shit_shooter](https://twitter.com/shit_shooter).

The next step is to determine your **implementation**. The way we're going to implement our solution is to have a function for each of the components of our formulae, then concatenate the results into a single insult in `generateInsult()`.

```
function insultAdjective() {
    return "dumb";
}

function insultNoun() {
    return "numbskull";
}

function insultVerb() {
    return "slaps";
}

function pluralNoun() {
    return "bears";
}

function generateInsult() {
    return "You are a " + insultAdjective() + " " + insultNoun() + " who " + insultVerb() + " " + pluralNoun();
}
```

The console will now output `You are a dumb numbskull who slaps bears`. Note that a) spaces are important to remember when working with strings, and b) we are *building out* the main function while *stubbing out* the supporting functions.

## Arrays

The thing we actually need from each of these supporting functions is for it to return one random option from a list of choices. Thet two pieces of functionality we need in order to do that are a) the ability to define a list of strings, and b) the ability to pick one of those at random.

Let's start with the first part of the problem: **arrays**. An array is a list of things, in this case, strings. You define an array with square brackets and commas, like this:

```
var listOfAdjectives = [
    "dumb",
    "silly",
    "odd",
    "corpuscular"
];
```

Note that we are creating a variable here (`listOfAdjectives`) and assigning values to it, which is a **command**, so the whole sequence is still ended by a semicolon.

We can pull values out of an array by using square brackets and the **index** of the **element** (ie individual object within the list) we're looking for. So if you do `var a = listOfAdjectives[0]` above, then `a` will contain the value `dumb`. Note that the first element in array is always `0`. So in this case, our four elements are indexed `0, 1, 2, 3`.

Put the `listOfAdjectives` array in the `insultAdjective()` function, and have that function return `listOfAdjectives[3]`:

```
function insultAdjective() {
    
    // Define the list of adjectives it's possible to use
    var listOfAdjectives = [
        "dumb",
        "silly",
        "odd",
        "corpuscular"
    ];

    // TODO: return a random element of this array.
    return listOfAdjectives[3];
}
```

Our console will now output `You are a corpuscular numbskull who slaps bears`. New insult achieved.

## Random Numbers

In Javascript, we get random numbers by using the `Math` library. The specific function we use to get a random number is called `Math.random()`, which will return a random number between 0.0 and 1.0. `console.log()` can also handle numbers, so if you put `console.log(Math.random());` in your code, you'll see one of these raw random numbers.

A number with decimal places is called a `float`. There's also something called a `double` which is a specific kind of float that has only two decimal places, which is used for currency. Don't worry about the specifics of that for now. For now the thing to know is the difference between a `float` and an `int`. An `int` is an integer, aka a whole number. This is especially useful in when working with arrays because an array's **index** is always an int.

The function `Math.floor(n)` will round any float down to an int. So `Math.floor(1.13)` would return an int equal to `1`, for instance.

Finally, we can get the number of elements in an array by using a attribute of the array type called `length`. We retrieve attributes by using the `.`, but don't worry about that for now. Just know that we can get the number of elements in the array above by doing `listOfAdjectives.length`, which in this case is equal to `4`.

Putting it all together, we can get a random element in our array thusly:

```
var randomIndex = Math.floor(Math.random() * listOfAdjectives.length);
```

This basically multiplies our random number (between one and zero) by the total number of elements, giving us a number between `0.000001` and `3.99999`, and then rounding down to an int, giving us a number between `0` and `3`, aka the full range of elements in our array.

Putting it all together, we get this:

```
function insultAdjective() {
    
    // Define the list of adjectives it's possible to use
    var listOfAdjectives = [
        "dumb",
        "silly",
        "odd",
        "corpuscular"
    ];

    // Get a random index
    var randomIndex = Math.floor(Math.random() * listOfAdjectives.length);

    // Return our random element
    return listOfAdjectives[randomIndex];
}
```

Note that because `randomIndex` is an int, we can use it as an index for `listOfAdjectives`. Implementing this means that every time you run the script (by pressing F5 in VSC) you'll get a different adjective.

## Wrapping

You now have all the tools you need to complete your requirements. Implement an array and random index in each of the other three supporting functions and you'll end up with a full MadLibs-style insult generator.

## Bonus Feature: Loops

If you'd like to generate a list of insults in the console without having to hit F5 over and over again, you can use something called a **for loop**. Let's say we want to print ten different insults to the console. We can do that thusly:

```
for (var i = 0; i < 10; i++) {
    console.log(generateInsult());
}
```

Note that the for loop is defined by three statements within its parentheses. First, the variable `i` is defined and assigned the value of `0` (it's an int). The second statement determines how long the loop will run. `i < 10` means the loop will continue as long as `i` is less than `10`. The final statement means that every time the loop fires, it will increment `i` by one. Functionally, this set of statements means that the loop, aka the code contained within the loop's curly brackets, will run ten times, because as soon as `i` is equal to `10`, the second statement will fail and the loop will no longer run.

The result will be a nice list of ten insults in your console. Congratulations!