![GALOGO](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67) 

# Intro to E2E Testing in React with Jest and Puppeteer

### Why is this important?

- Automated testing can save tons of time and money! 
- Jest is a new, modern testing framework brought to us by Facebook
- E2E testing can test the big picture of your app, and is very useful in catching mistakes before deployment.
- In combination with Unit Tests, E2E tests make up a comprehensive testing suite. 

### What are the objectives?

* Explain what E2E testing is in relation to other kinds of testing
* Set up Jest with Puppeteer in React
* Write a E2E test using Jest and Puppeteer, and run it from the command line

## Testing Review

There are several types of tests!

1. Unit Tests
2. Integration Tests
3. E2E Tests
4. Regression Tests
5. Smoke Tests
6. Alpha Tests
7. Beta Tests
8. System Tests 
9. Stress Tests

More on [types of testing](https://www.geeksforgeeks.org/types-software-testing/)

### E2E Testing 

E2E Testing, or End to End Testing, tests the whole system. It can test things like "When a user enters their username and correct passoword in the sign in page, they get redirected to their profile, and can see their username displayed". 

E2E testing tests simulate real user experience, essentially creating an automated user! Because of this, E2E tests are written on _the front end_. But ultimately, the test the whole system. 

The way we are able to accomplish this is with a virtual browswer, in this case a "Headless Chrome Node API", which is where Puppeteer comes in. We also need a framework for writing our tests. For that we will continue using Jest. 

#### What to test with E2E tests

End to end tests should test user flows that are critical to your app, like our login example above. Other things to test with E2E tests include:

- A basic "homepage is working" test
- User sign up
- Viewing important resources
- User submitting a resource from a form

#### Pros and Cons of E2E testing

Pros: 

1. Write just a few tests that make sure large parts of your app are functioning, rather than counting on comprehensive Unit tests, which may not catch everything
2. Test dependencies, like external API's alerting you to the problem
3. Ship with confidence knowing the most important features work with your new code. 

Cons:

1. All this Headless Chrome stuff is time consuming! E2E tests take a while to run, so they are best run with a Continuous Integration SASS (in other words, run in the cloud.)
2. E2E tests rely on cues from the UI, which can change! It's best to try to use UI that is _least_ likely to change when writing E2E tests. 

For these reasons, E2E Tests should make up the smallest part of your testing suite. But we only need a few, since one test can capture so much! 

### Setting Up 

Please clone this repo! 


```bash
npm install
npm run build
npm start
```
In a new tab:

```bash
npm run test
```

This repo already has Jest set up, so let's get right to the good stuff! 
If you were starting with a repo with only Jest installed, you would run: 
```bash
npm i --save-dev puppeteer
```

But our code has that too, and a first test. Check out that code! 


### Writing Tests

OK! We our basic home page test, and we can see it in the magical robot Chrome! Fantastic!

But this repo also has the dice button, which hits an API and tells us a trick to do. (This API is on Heroku, and may take a couple seconds to turn on when first using it)

Let's write a test for that too. We're going to add it to the same describe, for reasons we shall see in a few minutes. So let's change the `describe('H1 Text', () => {` to `describe('Home Page', () => {`.

```js
test('dice roll displays trick', async () => {
  	let browser = await puppeteer.launch({
  		headless: false
  	});
  	let page = await browser.newPage();

  	page.emulate({
		viewport: {
			width: 500,
			height: 2400
		},
		userAgent: ''
	});
	await page.goto('http://localhost:3000/');
	await page.waitForSelector('button');
	await page.click('button');
	await page.waitForSelector('h2');

	const html = await page.$eval('h2', e => e.innerHTML);
	console.log(html);

	expect(html.length).toBeGreaterThan(7);

	browser.close();
  }, 160000)
```

OK wonderful! This should pass. 

### Drying things up with `beforeAll` and `afterAll`

Notice we have a lot of repeated set up, and one repeated tear down line in both tests. We can dry that up, and also speed our tests up, by using `beforeAll` and `afterAll`. If you need to do any set up that should happen before or after _each_ test, there is also `beforeEach` and `afterEach`. But we don't need that here: 


```js
describe('Home Page', () => {
	let browser;
	let page;

	beforeAll(async () => {
		// launch browser	
		browser = await puppeteer.launch(
			{
			headless: false, // headless mode set to false so browser opens up with visual feedback
			slowMo: 250, // how slow actions should be
			}
		)
		// creates a new page in the opened browser	
		page = await browser.newPage();
		page.emulate({
			viewport: {
					width: 500,
					height: 2400
			},
			userAgent: ''
		});
		await page.goto('http://localhost:3000/');
	})

	test('h1 loads correctly', async () => {
			await page.waitForSelector('.App-title');

			const html = await page.$eval('.App-title', e => e.innerHTML);
			expect(html).toBe('Welcome to Skate Dice!');
	}, 160000);

	test('dice roll displays trick', async () => {
			await page.waitForSelector('button');
			await page.click('button');
			await page.waitForSelector('h2');

			const html = await page.$eval('h2', e => e.innerHTML);

			expect(html.length).toBeGreaterThan(7);
	}, 160000)

	afterAll(() => {
		browser.close()
	})
});
```

### Resources
- [Sandi Metz's Magic Tricks of Testing](https://www.youtube.com/watch?v=URSWYvyc42M)
- [Jest docs](https://facebook.github.io/jest/docs/en/getting-started.html)
- [Puppeteer Docs](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)
- [Blog on Puppeteer + Jest + React](https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7)
- [Another Blog on Puppeteer + Jest + React](https://blog.bitsrc.io/testing-your-react-app-with-puppeteer-and-jest-c72b3dfcde59)
- [Cypress E2E Testing Framework](https://www.cypress.io/)