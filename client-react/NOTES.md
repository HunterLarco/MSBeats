§# Notes on working in this project
> by Jeroen Ransijn

## Some of the technologies used

- [Redux](http://rackt.org/redux/index.html)

## Flow of a request

1. `server.js`

Takes in the first request and renders the website as HTML on the server.
There is no need to change this file.

2. `routes.js`

Renders the App component and passes along the component defined in the route.

- The `rootReducer` is defined in `reducers/main.js`
- Create a `store` from the `rootReducer`.
- `Provider` takes the `store` as an attribute
- `Provider` makes sure components can `connect` to the state

3. `App.js`

The first component in the render tree.

## Flow of an user interaction

Whenever there is interaction by the user or the server/api an action is dispatched.
An action describes the difference between the previous state and the new state.
The `rootReducer` takes in the previous state and the action and returns a new state.

### Creating an action by example

1. Go to `actions/main.js`.

2. Inside `actions/main.js` add a new constant `ADD_TODO`, and export it

```javascript
// The name of the constant name and the value should always be identical
export const ADD_TODO = 'ADD_TODO'
```

3. Inside `actions/main.js` create a function `addTodo`, and export it

```javascript
export function addTodo(text) {
  return {
    // An action should always contains a `type`
    type: ADD_TODO,
    // An action may also contain other information
    text // ES6 shorthand for text: text
  }
}
```

### Dispatching an action by example

Whenever there is a user interaction like a click, dispatch an action.

1. Import the desired action in your component

```javascript
import { addTodo } from '../../actions';
```

2. Make sure your component is connected, see `Connecting a component`

3. Dispatch your action on a certain interaction

```javascript
// Inside a component

onClick(e) {
  const { dispatch } = this.props;
  dispatch(addTodo('My todo text'))
  e.preventDefault()
}

render() {
  return (
    <button onClick={this.onClick.bind(this)}>Add todo</button>
  );
}
```

### Connecting a component
> Make the state available in components

The `Provider` takes the store inside `routes.js` and
takes care of making the state and `dispatch` available on `this.props` inside components.

Connect the component before you can access the state on `this.props`.
Make sure you import `connect` from `react-redux`

```javascript
import { connect } from 'react-redux';

// Component implementation...

export default connect()(ComponentName);
```

## Setting up a new route

Go to `routes.js` and add a new route with the page you want:

```
on('/name-of-route', async () => <NameOfRoutePage />);
```

## Creating a new page/component

1. Create a new folder in the components folder with the name of your component.

2. Add a `package.json` with the following contents.

```json
{
  "name": "ComponentName",
  "version": "0.0.0",
  "private": true,
  "main": "./ComponentName.js"
}
```

3. Create the `ComponentName.js` file. Add the following boilerplate and Replace ComponentName:

```javascript
import React, { Component, PropTypes } from 'react';
import s from './ComponentName.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ComponentName extends Component {

  render() {
    return (
      <div></div>
    );
  }

}

export default withStyles(ComponentName, s);

```

4. Create the `ComponentName.scss` in the same directory.

## When to create a package.json

You should create a `package.json` for your component.
See `Creating a new page/component`.
