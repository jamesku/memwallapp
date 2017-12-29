import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from '../reducers';

// const initialState = {};

export default function configureStore(initialState) {

  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
}
