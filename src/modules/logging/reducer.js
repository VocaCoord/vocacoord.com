import { LOGGING_ADD } from './actionTypes'

const logging = (state = [], action) => {
  switch (action.type) {
    case LOGGING_ADD:
      return [...state, action.payload]
    default:
      return state
  }
}

export default logging
