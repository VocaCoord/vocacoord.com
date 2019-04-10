import { LOGGING_ADD } from './actionTypes'

export const addLog = ({ name }) => ({
  type: LOGGING_ADD,
  payload: { name, time: new Date() }
})
