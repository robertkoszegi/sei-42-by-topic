import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { isSnakeEyes } from './dice/diceHelper';
import puppeteer from 'puppeteer';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('isSnakeEyes()', () => {
  test('isSnakeEyes returns true when both die are 1', () => {
    expect(isSnakeEyes(1, 1)).toBeTruthy();
  });
});

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
    // sets up a browser to launch
    let browser = await puppeteer.launch({
      headless: false,
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: '',
    });
    // go to home page
    await page.goto('http://localhost:3000/');
    // wait for title to load
    await page.waitForSelector('.App-title');
    const html = await page.$eval('.App-title', (e) => e.innerHTML);
    // actual test:
    expect(html).toBe('Welcome to Skate Dice!');

    browser.close();
  }, 160000);
});
