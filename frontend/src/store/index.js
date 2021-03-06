import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import businessReducer from './business';
import sessionReducer from './session';
import tagReducer from './tag';
import reviewReducer from './review';
import usersReducer from './users';
import likesReducer from './like'

const rootReducer = combineReducers({
  session: sessionReducer,
  tags: tagReducer,
  businesses: businessReducer,
  reviews: reviewReducer,
  users: usersReducer,
  likes: likesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;
