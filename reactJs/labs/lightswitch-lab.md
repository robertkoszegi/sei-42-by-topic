# "More Event Handling" Lab: LightSwitch

## Task

In order to practice more event handling (on which your P4 assessment will be based, here is another addtional practice lab on event handling.)

1. Define two user-defined components, `<Top>` and `<Bottom>`, and make them show up in your `<App>` component.
2. In the `<Bottom>` component, render two buttons, one that says "on" and one that says "off"
3. Using the lessons from our event handling lab, make it so that clicking the "on" button turns the Top component's background white, as in the first picture below., and clicking the "off" button turns the Top component's background black, as in the second picture below.

<img src="https://user-images.githubusercontent.com/24878576/115239921-3ca3e780-a0ed-11eb-8c6d-7c0b5e6ea2ee.png" height="400">

<img src="https://user-images.githubusercontent.com/24878576/115239745-1120fd00-a0ed-11eb-90ec-233af0472881.png" height="400">

## Hints (if you need 'em)

1. In order to achieve this, you'll want to initialize a piece of state in your App component, perhaps like this:
```js
export default class App extends React.Component {
  state = {
    colour: "black"
  };

  render() {
    return (
      <div className="App">
      ...etc...
```
2. You'll want to define one or two handler methods (eg., handleOffButtonClicked(), handleOnButtonClicked()) in your App component and the job of these handler methods is simply to setState to colour:"white", or setState to "black"
3. You'll want the buttons in the `<Bottom>` component to call these handler methods to change the state.

<details>
<summary>However, since the buttons are in the &lt;Bottom&gt; component, but the handler 
methods are in the &lt;App&gt; component, the &lt;Bottom&gt; component cannot access the handlers in the &lt;App&gt; unless.....what? </summary>
<p><strong>Unless you pass down the handler methods from &lt;App&gt; to &lt;Bottom&gt; **via props**, and have the handler method execute using a button onClick event.</strong></p>
</details>

4. If you've passed down the props correctly, and the buttons are connected to the onClick, and the onClicks are executing the passed-down handler methods, you should be able to verify that your App state is changing using react dev tools. If you can't, try to debug steps 1-3. Once you have your buttons changing state, making the state change the background colour can be done in the next step below.
5. You'll want the colour of the `<Top>` component to change its background colour based on state. 
![image](https://user-images.githubusercontent.com/24878576/115242211-a6bd8c00-a0ef-11eb-833d-f5b2c603765b.png)

<details>
<summary>However, since the state is in the &lt;App&gt; component, the &lt;Top&gt; component cannot access the state in order to figure out its background colour, unless.....what? </summary>
<p><strong>You have to pass down the state (ie., colour) from &lt;App&gt; to &lt;Top&gt; **via props**, and have the &lt;Top&gt; set its div style backgroundColor to be based on the incoming prop.</strong></p>
</details>

## Bonuses:

1. Instead of two buttons, use one button whose text switches between the words 'On and 'Off' depending on the current state.
2. When the 'on' or 'off' button is clicked, make some cool dancy animated text show up using either the "framer motion" animation library or "react spring" animation library, or another react text animation library of your choosing.
3. Do this with hooks.
