# Event Handling Lab: Pokemon Battle

<img src="https://user-images.githubusercontent.com/24878576/114391828-f6d3a600-9b65-11eb-98ca-61b96e484a15.png">

## Objective

This Lab is probably the most important lab in terms of testing your React skill. It tests your knowledge of: 
  - components, 
  - props, 
  - state,
  - writing a click handler
  - the ability to click a button in one component, and cause visual changes in another component.

This lab is also using very similar skills to what your P4 assessment will test so it's good practice.

You will be making a little pokemon battle app, like <a href="https://pokemonbattle.alexanderghose.repl.co/">this</a>. Notice that when you click on the charizard's attack button, the pikachu's hp goes down, and vice versa.

## Wait, I don't know anything about pokemon. Can I change the theme?

Absolutely yes. Prior students have also used various other themes to do this lab, such as this Tyson vs. Honda battle here:
<img src="https://user-images.githubusercontent.com/24878576/114390791-b3c50300-9b64-11eb-8fe2-f8ce5643519e.png">

## Task Overview

Your finished lab should function something like this - <a href="https://pokemonbattle.alexanderghose.repl.co/">Click here to try it out! </a>
  
## Hints

<img src="https://user-images.githubusercontent.com/24878576/114392496-de17c000-9b66-11eb-820a-54f5798ce10e.png">

As with your previous apps, we will follow the <a href="https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy">'thinking in react' guide to setting up a React app</a>, namely:

1. Break this "App" into a component hierarchy (done for you above):
2. Mockup (in code) functional presentational components (Using either codesandbox.io or create-react-app.)
    - The `<App>` component should be composed of two `<Pokemon>` user-defined components, and an `<h2>` builtin component.
    - Each `<Pokemon>` component is composed of three builtins: an `<h1>` for the hp, an `<img src="http://whateverpokemon.png">`, and a `<button>` that says "attack!"
    - The `<Pokemon>` components should receive their hp, and img src via props from the parent <App> component. (if you need a hint, you can look at this screenshot of a previous student's `<App>` component's render() method: <a href="https://user-images.githubusercontent.com/24878576/114393185-bd9c3580-9b67-11eb-923e-d897ca05ffc3.png">here</a>
3. Add basic styling so that components are in position. You may or may not find the below classes useful to apply to your components:

```css
.Pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}
.App {
  font-family: sans-serif;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}

```

4. Identify the state you need. What pieces of data are changing, visually? 
    - In this case, really just the pokemon 1's hp and pokemon 2's hp, and maybe the status message.
6. Initialize the state in the <App> component. (You will have to convert this to a class component)
7. Access the state. Give state to the components that needs it.
    - For example, each `<Pokemon>` probably needs to know its hp, so you can store each pokemons hp separately in state, and pass pokemon 1's hp down via props to pokemon1, and pass pokemon 2's hp down via props to pokemon2.
    - Also, the status message needs to be displayed right in the `<App>` component, so access the state to grab the status message.
8. Update state.
    - This is where the fun happens
    - In your `<App>` component you'll write one or two clickHandler methods that will use setState to reduce the pokemon 1's hp and pokemon 2's hp
    - We want these methods to be called based on when someone clicks. So then:
        - Pass down the clickHandler functions from `<App>` to each `<Pokemon>` via props( ie., Give the first <Pokemon> the handler method that will reduce the second pokemons hp. Give the second <Pokemon> the handler method that will reduce the first pokemon's hp)
        - Set the onClick attribute of each pokemon's button to call this clickHandler function the pokemon is being given
        - You can use the Event Handling lesson as a guide
9. Celebrate!
    - If you can do this lab, you have a solid enough understanding of React to be able to do almost anything.
10. (optional) (bonus) Do what we just did using React Hooks.

This is probably the hardest and most important React lab, and will be the one that is closest to your P4 assessment, so do try your best.

