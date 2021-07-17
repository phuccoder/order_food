# Order Food App
Expo project

### Redux thunk

Redux Thunk [middleware](https://redux.js.org/advanced/middleware)
allows you to write action creators that return a function instead of an action.
The thunk can be used to delay the dispatch of an action, or to dispatch only if
a certain condition is met. The inner function receives the store methods
`dispatch` and `getState` as parameters.

```bash
npm install redux-thunk
```

Then, to enable Redux Thunk, use
[`applyMiddleware()`](https://redux.js.org/api/applymiddleware):

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const store = createStore(rootReducer, applyMiddleware(thunk))
```

### The connect() function connects a React component to a Redux store
```javascript
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```

<br />

### Get Location & Home Screen
<img src="demos/getLocation&homeScreen.gif" width=250 height=500 />

### Sign Up & Verify OTP
<img src="demos/signUp&otp.gif" width=250 height=500 />

### Log Out & Log In
<img src="demos/logOut&logIn.gif" width=250 height=500 />

### Add to cart & Update cart
<img src="demos/add&editItems.gif" width=250 height=500 />

### Apply Promotion
<img src="demos/applyPromo.gif" width=250 height=500 />

### Proceed Payment & Create Order
<img src="demos/createOrder.gif" width=250 height=500 />

### Order details & Cancel
<img src="demos/viewOrder&Cancel.gif" width=250 height=500 />

### End of section.
