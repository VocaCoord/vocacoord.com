import dotProp from 'dot-prop-immutable';

export const removeWords = (state, wordBankId) => {
  const words = dotProp.get(state, `wordbanks.${wordBankId}.words`);
  let newState = dotProp.get(state, '', state);
  words.forEach(word => {
    newState = dotProp.delete(newState, `words.${word}`);
  });
  return newState;
};

export const removeWordBanks = (state, classId) => {
  const wordBanks = dotProp.get(state, `classrooms.${classId}.wordbanks`);
  let newState = dotProp.get(state, '', state);
  wordBanks.forEach(wordBank => {
    newState = removeWords(newState, wordBank);
    newState = dotProp.delete(newState, `wordbanks.${wordBank}`);
  });
  return newState;
};
