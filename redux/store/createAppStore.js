import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

const middleware = [thunk];

const configureStore = compose(
  applyMiddleware(...middleware),
)(createStore)

const config = {
  key: 'root',
  storage,
}


const reducer = persistReducer(config, rootReducer);

const createAppStore = () => {
  let store = configureStore(reducer)
  let persistor = persistStore(store)
    return { persistor, store }
  }


export default createAppStore;
