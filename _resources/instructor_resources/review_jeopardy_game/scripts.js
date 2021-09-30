function renderBody(questions, revealed_questions) {
  let tbody = document.querySelector('tbody')
  while (tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }
  for (let i = 0; i < questions_array['html,css'].length; i++) {
    let tr = document.createElement('tr');
    for (let category in questions) {
      let td = document.createElement('td');
      td.dataset.question = questions[category][i];
      td.addEventListener('click',function(event) {
        add_to_revealed_list(event,revealed_questions);
      });
      if (revealed_questions.has(questions[category][i])) {
       td.innerHTML = questions[category][i];
      } else {
       td.innerHTML = "$" + (i+1)*100;
      }
      tr.appendChild(td);
    }
    document.querySelector('tbody').appendChild(tr);
  }
 }

 function add_to_revealed_list(event,revealed_questions) {
   revealed_questions.add(event.target.dataset.question);
   console.log(revealed_questions);
 }
 
 function renderHead(questions) {
   let thead = document.querySelector('thead')
   while (thead.lastChild) {
     thead.removeChild(thead.lastChild);
   }
   let tr = document.createElement('tr');
   for (let category in questions)  {
     let th = document.createElement('th');
     th.innerHTML=`${category}`;
     tr.appendChild(th);
   }
   thead.appendChild(tr);
 }
 
 function render(questions, revealed_questions) {
  renderHead(questions);
  renderBody(questions, revealed_questions);
  setTimeout(render,500,questions, revealed_questions);
 }

let revealed_questions = new Set();
let questions_array = {
  "html,css":[
              "how do i declare an html document?",
              "what is the difference between elements like <div> and <span> vs. elements like <section> and <nav> and <article>?",
              "what is the difference between block and inline elements?",
              "what is the DOM? why do we need it?",
              "what css property can i use to do something like <a href='https://codepen.io/matchboxhero/full/RLebOY'>this</a>",
            ],
  "variables,datatypes,operators":[
              "how do i declare a variable and put the number 5 in it?",
              "how can i prompt the user for input and store that in a variable?",
              "what's the difference between let x = 5 and let x = '5' ? In either case, what happens if i add 1 to x?",
              "what are the 6 primitive data types in javascript?",
              "will this work? <br />w = 5; <br />var w;<br /> console.log(w);<br />"
            ],
  "conditions and loops":[
              "<a href='http://jsfiddle.net/alexanderghose/yc9azjp2/'>jsfiddle</a>. Are the 2 statements doing the same thing? Why or why not?",
              "where is the mistake in this <a href='http://jsfiddle.net/alexanderghose/d8f42g3o/3/'>jsfiddle</a>?",
              "what are some types of loops in javascript?",
              "write a loop to print out all the numbers from 1 to 1000",
              "write a loop to sum all the numbers from 1 to 1000"
            ],
  "arrays and objects":[
              "declare an array and store a bunch of numbers in it",
              "declare a javascript object representing a person with keys name and age, and give it some values",
              "in a javascript object, what is a key, what is a property, and what is a value?",
              "declare an array and print out all the elements of the array",
              "declare an array and print out all the elements of the array multiplied by every other element of the array"
            ],
  "functions":[
              "what are some examples of builtin functions?",
              "this <a href='http://jsfiddle.net/alexanderghose/78qmuyew/1/'>jsfiddle</a> has a function that's already been declared. how do i execute it?",
              "what is an anonymous function? is it different from a normal 'named' function?",
              "declare a function that can add 2 numbers. call and execute this function",
              "if i have a function add(a,b) { return a+b }, and i pass in this array: let arr = [1,2]. what will be my output?"
            ],
  "DOM, events, callbacks":[
            "what is a javascript event? what types of events can you listen for?",
            "declare an event listener or an onclick that listens for a click and alerts 'hello'",
            "what is a callback function?",
            "what does setTimeout(myFunction, 2000) do?",
            "explain what the <a href='https://repl.it/@alexanderghose/traffic-light'>traffic light example</a> is doing"
            ]
}

// let questions_array = {
//   "variables and datatypes":["let vs var","what are some examples of datatypes?"],
//   "operators and conditions":["what does true && false return?","if elseif else syntax"],
//   "loops and arrays":["print all the numbers from 1 to 1000","give me 2 ways to loop through an object"],
//   "functions and objects":["declare a function that adds 2 numbers","declare an object that represents a person"],
//   "DOM, Events, callbacks":["what is the DOM?","how can i throw up an alert if a user clicks something?"],
// }

render(questions_array, revealed_questions);
