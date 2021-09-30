# The React Portfolio Lab (Pt. 2: Props, and Accessing State)

## Setup

This lab picks up where <a href="w10/d1/portfolio-lab-pt-1-components.md">Pt. 1</a> left off.

If you **didn't do Pt. 1**, you have a few options:
  - you may want to speed through Pt. 1 before trying this lab; or
  - if you really want to, you can perhaps use our <a href="w10/d1/sei-cafe-1-components/completed-code">day 1 completed code of SEI Cafe</a> as a sort of "starter code", and change the component names from things like OrderDetail to be something portfolio-like. But I think it's better to mock up your own portfolio with your own creativity.

## Tasks

For this lab, you are to complete each of the following objectives at least once. You're welcome to express your creativity in meeting these requirements:

1. define a prop in one of your components and pass it to a child component. This could be any data of your choosing, eg., `<NavBarItem name={'About'}>`
    - Verify using react dev tools that the prop is being passed down from this component to its child.
3. access a props in a child component and make it show up in the child component.
    - For example, maybe in your parent <App> component you are rendering a child component called <PhotoSection>. 
    - In that case, you can pass a prop like `imgURL={https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png}` from a parent component into your <PhotoSection> component, and make the photo show up!
    - Verify visually that it shows up on the page.
4. initialize at least one piece of state (This is hard because portfolios are normally stateless. But be creative - eg., a username, or an email to log into the blog we'll do in pt.8? a list of products to sell, eg., themed t-shirts or mugs? motivational quotes? number of seconds the user has spent on the site?)
    - For example, you may want to put a username and email into state, to represent a logged in user, for when we implement authentication. So this would be initialized to something like "" for example.
    - Or you may consider perhaps fictitiously (or really?) selling merchandise on this portfolio site, and maybe define some state for e-commerce apps, like cart: []
    - Verify using react dev tools
5. "access" a piece of state state in your parent component (ie., making your state show up in the parent component)
    - Make one of your pieces of state show up in the <App> component itself using {this.state.whatever}
6. pass state down to a child component, using props (ie., making your state show up in a child component)
    - Make one of your pieces of state show up in a child component by passing it down as props, and then accessing it via {props.whatever}
    - Verify using react dev tools that the child component is getting the state
7. (optional) practice using map to access a piece of state that is an array of objects
      - For example, perhaps you have a `portfolio` array in state like `portfolio: [{id:"0",projectTitle:"Hangman",projectImage:"http://asdfsd.jpg",description:"..."}, {id:"1",proj..}, ...]`
    - You may then want to try to make the array show up within neatly organized JSX components using a map, or using an imperative-style loop. You can use either:
        - builtin components (eg., `<li>Hangman</li> (link) (screenshot), <li>P2: E-commerce site (link) (screenshot)</li>`, etc....), or 
        - UserDefined components (eg., `<PortfolioItem />`)

# Deliverable

This Lab is a deliverable. You can either push this into a separate repo, or build on your lab 1 and just push the final result. Submitting each part in a separate repo might be a good insurance policy in the sense that, let's say in part 4 you decide to go nuts, then in part 5 you can go in another direction.
