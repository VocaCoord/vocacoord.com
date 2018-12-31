import * as types from '../constants/ActionTypes';

export const createClass = (code, name) => ({
  type: types.CREATE_CLASS,
  payload: { code, name }
});

export const editClass = (id, name) => ({
  type: types.EDIT_CLASS,
  payload: { id, name }
});

export const removeClass = id => ({
  type: types.REMOVE_CLASS,
  payload: { id }
});

export const createBank = (classId, name) => ({
  type: types.CREATE_BANK,
  payload: { classId, name }
});

export const editBank = (id, name) => ({
  type: types.EDIT_BANK,
  payload: { id, name }
});

export const removeBank = (classId, id) => ({
  type: types.REMOVE_BANK,
  payload: { classId, id }
});

export const createWord = (wordBankId, word) => ({
  type: types.CREATE_WORD,
  payload: { wordBankId, ...word }
});

export const editWord = (id, word) => ({
  type: types.EDIT_WORD,
  payload: { id, ...word }
});

export const removeWord = (wordBankId, id) => ({
  type: types.REMOVE_WORD,
  payload: { wordBankId, id }
});

/* TODO */
export const authenticateUser = ({ response }) => ({
  type: response.status,
  payload: response.payload
});

export const logOutUser = () => ({
  type: types.LOG_OUT
});
