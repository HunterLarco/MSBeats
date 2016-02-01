# Make School Beats client
> Using Node.js, Express.js, SCSS, Gulp

## Install node.js

1. [Install node](https://nodejs.org/en/)

2. Run `$ npm install` in the `client` directory to install dependencies

## Run your project

1. Run `$ npm start` to start the server and run all the build steps

2. Open up [http://localhost:3000](http://localhost:3000)

## Test your project

1. Run `$ npm text` to run all tests in the `/test` folder with mocha

## Build your project

1. Run `$ npm run build`

### Moving the build step to the server in a production environment

Normally you wouldn't want to have the `dist` (distribution) folder in your git repo.
The server should run `$ npm run build` on every push to the server to compile the right assets.

## Writing JS

In this project there is support for writing ES6. All your JS will be transpiled
to work on the browser. Put your files in `src/js`, the result will be in `public/dist/js`.

## SCSS variable city blocks naming

City blocks naming is used for variables such as `$font-size-100`.
Where the number 100 represents the default in the scale.
