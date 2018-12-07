import * as types from "../constants/ActionTypes";

export const addClass = (code, name) => {
  return {
    type: types.ADD_CLASS,
    payload: { code, name }
  };
};

export const editClass = (id, name) => {
  return {
    type: types.EDIT_CLASS,
    payload: { id, name }
  };
};

export const removeClass = id => {
  return {
    type: types.REMOVE_CLASS,
    payload: { id }
  };
};

export const addBank = (classId, name) => {
  return {
    type: types.ADD_BANK,
    payload: { classId, name }
  };
};

export const editBank = (id, name) => {
  return {
    type: types.EDIT_BANK,
    payload: { id, name }
  };
};

export const removeBank = (classId, id) => {
  return {
    type: types.REMOVE_BANK,
    payload: { classId, id }
  };
};

export const addWord = (wordBankId, word) => {
  return {
    type: types.ADD_WORD,
    payload: { wordBankId, ...word }
  };
};

export const editWord = (id, word) => {
  return {
    type: types.EDIT_WORD,
    payload: { id, ...word }
  };
};

export const removeWord = (wordBankId, id) => {
  return {
    type: types.REMOVE_WORD,
    payload: { wordBankId, id }
  };
};

/* TODO */
export const authenticateUser = ({ response }) => {
  return {
    type: response.status,
    payload: response.payload
  };
};

export const logOutUser = () => {
  return {
    type: types.LOG_OUT
  };
};
