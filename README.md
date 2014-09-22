# NodeJS module template

This is a project where you will find the structure of a [NodeJS] module,
ready to start working on it. The module will use the following libraries:
- [Gulp]: as a tool to automate tasks
- [Mocha]: as a test runner tool
- [Chai]: as a assertion library for tests
- [Sinon]: as a mock library for tests

In this file, there are instructions about how to install and get working
all those libraries.

# How to install NodeJS

The very first thing to do is to install NodeJS.

To install it in Ubuntu, just run

    sudo apt-get install nodejs

To install in other operating systems, go to the [NodeJS download page].

There is another way of installing NodeJS, through `nvm` 
([Node Version Manager]).

Other libraries will be install via `npm`.

# Init `npm`

Run the command:

    npm init

It will walk you through some basic configuration for a NodeJS module. The
most important information you provide will be: name, description and version.

A `package.json` file like this will be written:

    {
        "name": "nodejs-module-template",
        "version": "0.0.0",
        "description": "A template for NodeJS modules",
        "main": "index.js",
        "directories": {
            "test": "test"
        },
        "dependencies": {},
        "devDependencies": {},
        "scripts": {
            "test": "test"
        },
        "author": "Ruben Chavarria http://rchavarria.github.io",
        "license": "BSD-2-Clause"
    }


# Install gulp

You can install it with this simple command:

    npm install --save-dev gulp

The `--save-dev` flag will insert a new line in the `package.json` file to
tell `npm` about your project's dependencies.

Test the installation with `gulp --version`.

# Configure gulp

Create a `gulpfile.js` file in the project's root folder. The content of the
file could be:

    var gulp = require('gulp');

    gulp.task('default', function() {
        console.log('Hello gulp!');
    });

Run `gulp` command to see a message in the console.

# Install tests libraries

It is so easy to install those libraries that we will do it in a single command:

    npm install --save-dev mocha chai sinon sinon-chai

Test mocha installation with `node node_modules/mocha/bin/mocha --version`.

# Before writting your first test

Before start writting tests, we will create a bootstrap file for mocha, to
initialize all libraries and avoid writting boilerplate code in every single
test we have.

Create a file called `test/bootstrap.js` with this content:

    global.chai = require('chai');
    global.sinon = require('sinon');
    global.expect = chai.expect;

    var sinonChai = require('sinon-chai');
    chai.use(sinonChai);

This loads Chai and Sinon libraries, creates a `expect` method in the global
scope, and configures Chai to use Sinon expect functionalities.

Now, we are going to create a Gulp task to run tests. First we need a Gulp
plugin to be able to run Mocha from Gulp. Just type in the command line:

    npm install --save-dev gulp-mocha

Then, edit `gulpfile.js`, and leave it as this:

    var gulp = require('gulp'),
        mocha = require('gulp-mocha');

    gulp.task('test', function () {
        return gulp
            .src(['test/bootstrap.js', 'test/scripts/**/*.js'])
            .pipe(mocha({ reporter: 'spec' }));
    });

# First test

Create a file called `test/scripts/firstSpec.js` with this content:

    describe('Mocha', function() {
        it('expects using Chai', function() {
            expect(2 + 2).equals(4);
        });
    });

You can run this test just typing `gulp test`.

# Watch tests and production files to change

You can configure gulp to run a specific tasks every time a file changes.
We will configure it to run the `test` task every time a production file or a
test files changes. Add the following task to `gulpfile.js`.

    gulp.task('test-watch', function () {
        return gulp.watch(['src/scripts/**/*.js', 'test/scripts/**/*.js'], ['test']);
    });

Test it with `gulp test-watch` and change `firstSpec.js` to see all tests run
automatically.

# Test some production code

Write a simple NodeJS module to sum two integers, save it as `src/scripts/adder.js`.

    module.exports = function adder(a, b) {
        return a + b;
    };

Replace `test/scripts/firstSpec.js` content with this:

    describe('Adder module', function() {
        // imports the adder module
        var adder = require('../../src/scripts/adder.js');

        it('adds two integers', function() {
            var sum = adder(2, 2);
            expect(sum).equals(4);
        });
    });

# Further reading

Read documentation for [Gulp] to know more about its tasks, [Mocha] and
[Mocha's plugin for Gulp] to know more about Mocha's options, [Chai] to 
learn about its `expect` API, [Sinon] to learn about mocking, spying and
stubbing JavaScript objects and functions.

[NodeJS]: http://nodejs.org
[Gulp]: http://gulpjs.com
[Mocha]: https://github.com/visionmedia/mocha
[Mocha's plugin for Gulp]: https://github.com/sindresorhus/gulp-mocha
[Chai]: http://chaijs.com
[Sinon]: http://cjohansen.no/sinon
[NodeJS download page]: http://nodejs.org/download
[Node Version Manager]: http://carlosazaustre.es/blog/como-instalar-node-js-en-ubuntu
