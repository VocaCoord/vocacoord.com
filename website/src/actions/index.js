export const CLASS_REQUEST = "CLASS_REQUEST";
export const CLASS_SUCCESS = "CLASS_SUCCESS";
export const CLASS_FAILURE = "CLASS_FAILURE";

/* works */
export const addClass = (code, name) => {
  return {
    type: "ADD_CLASS",
    payload: { code, name }
  };
};

/* works */
export const editClass = (id, name) => {
  return {
    type: "EDIT_CLASS",
    payload: { id, name }
  };
};

/* works */
export const removeClass = id => {
  return {
    type: "REMOVE_CLASS",
    payload: { id }
  };
};

/* works */
export const addBank = (classId, name) => {
  return {
    type: "ADD_BANK",
    payload: { classId, name }
  };
};

/* works */
export const editBank = (id, name) => {
  return {
    type: "EDIT_BANK",
    payload: { id, name }
  };
};

/* works */
export const removeBank = (classId, id) => {
  return {
    type: "REMOVE_BANK",
    payload: { classId, id }
  };
};

/* TODO */
export const addWord = (wordBankId, name) => {
  return {
    type: "ADD_WORD",
    payload: { wordBankId, name }
  };
};

/* TODO */
export const editWord = (id, name) => {
  return {
    type: "EDIT_WORD",
    payload: { id, name }
  };
};

/* TODO */
export const removeWord = (wordBankId, id) => {
  return {
    type: "REMOVE_WORD",
    payload: { wordBankId, id }
  };
};
