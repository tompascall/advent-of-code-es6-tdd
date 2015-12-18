# advent-of-code-es6-tdd

In this project we solve some of the [advent of code](http://adventofcode.com) puzzles, using es6 features and tdd approach. 

###Solutions

The solutions are in the `src` library. You can show them by running `babel-node src/<solution-file>` from the project library.

###Prerequisites

Clone the project and **install the npm packages** (via `npm install`).

You need to install globally
- Node
- Gulp
- babel-node

###Tests

After installation you can test the modules by `gulp karma` (or `npm run test`).

###Development

We use
- **Gulp** for task running,
- **Webpack** to handle your modules,
- **Karma** for running your tests,
- **Mocha** and **Chai** for your tests,
- **Babel** for transpiling your code,
- **ESLint** for linting your code,
- **PhantomJS** headless browser as an environment for the tests,
- **Sinon** as mocking framework.

####Gulp Tasks

- the default task (`gulp`) runs linting, cleans everything from `dist` folder and 
transpliles your javascript files located in `src` folder and saves them into `dist` folder. 
- `gulp karma`: runs your test in `test` folder once
- `gulp karma-watch`: runs your test in `test` folder, and after changing some file in `src` or `test` folder 
runs the tests again.
- `gulp watch`: lints your files and watch their changes.

You have to save your tests into `test` folder as `*.spec.js`.
