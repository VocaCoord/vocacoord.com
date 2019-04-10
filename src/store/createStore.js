import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/messaging'
import makeRootReducer from './reducers'
import {
  firebase as fbConfig,
  reduxFirebase as rrfConfig,
  env
} from '../config.dev'
import { metaDataConfig } from './metaDataConfig'

export default (initialState = {}) => {
  const defaultRRFConfig = {
    userProfile: 'users',
    updateProfileOnLogin: false,
    presence: 'presence',
    sessions: null,
    enableLogging: false,
    useFirestoreForProfile: true,
    useFirestoreForStorageMeta: true
  }

  const combinedConfig = rrfConfig
    ? { ...defaultRRFConfig, ...rrfConfig, ...metaDataConfig }
    : defaultRRFConfig

  const enhancers = []

  if (env === 'local') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const middleware = [thunk.withExtraArgument(getFirebase)]

  firebase.initializeApp(fbConfig)
  firebase.functions()

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reduxFirestore(firebase),
      reactReduxFirebase(firebase, combinedConfig),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
