import merge from "lodash/merge";
import dotProp from "dot-prop-immutable";
import { combineReducers } from "redux";
import uuidv1 from "uuid/v1";

const initialState = {
  classrooms: {},
  wordbanks: {},
  words: {}
};

function userDataReducer(state = initialState, action) {
  switch (action.type) {
    /* works */
    case "ADD_CLASS": {
      const uuid = uuidv1();
      return dotProp.set(state, `classrooms.${uuid}`, {
        ...action.payload,
        id: uuid,
        wordbanks: []
      });
    }

    /* works */
    case "EDIT_CLASS": {
      const { id, name } = action.payload;
      return dotProp.set(state, `classrooms.${id}.name`, name);
    }

    /* works */
    case "REMOVE_CLASS": {
      const { id } = action.payload;
      const newClassState = removeWordBanks(state, id);
      return dotProp.delete(newClassState, `classrooms.${id}`);
    }

    /* works */
    case "ADD_BANK": {
      const uuid = uuidv1();
      const { classId } = action.payload;
      const classState = dotProp.merge(
        state,
        `classrooms.${classId}.wordbanks`,
        [uuid]
      );
      return dotProp.set(classState, `wordbanks.${uuid}`, {
        ...action.payload,
        id: uuid,
        words: []
      });
    }

    /* works */
    case "EDIT_BANK": {
      const { id, name } = action.payload;
      return dotProp.set(state, `wordbanks.${id}.name`, name);
    }

    /* works */
    case "REMOVE_BANK": {
      const { classId, id } = action.payload;
      const newWordState = removeWords(state, id);
      const oldWordBanks = dotProp.get(
        newWordState,
        `classrooms.${classId}.wordbanks`
      );
      const newWordBanks = oldWordBanks.filter(oldId => oldId !== id);
      const newClassState = dotProp.set(
        newWordState,
        `classrooms.${classId}.wordbanks`,
        newWordBanks
      );
      return dotProp.delete(newClassState, `wordbanks.${id}`);
    }

    /* TODO */
    case "ADD_WORD": {
      const uuid = uuidv1();
      const { wordBankId } = action.payload;
      const wordBankState = dotProp.merge(
        state,
        `wordbanks.${wordBankId}.words`,
        [uuid]
      );
      return dotProp.set(wordBankState, `words.${uuid}`, {
        ...action.payload,
        id: uuid
      });
    }

    /* TODO */
    case "EDIT_WORD": {
      const { id, name } = action.payload;
      return dotProp.set(state, `words.${id}.name`, name);
    }

    /* TODO */
    case "REMOVE_WORD": {
      const { wordBankId, id } = action.payload;
      const oldWords = dotProp.get(state, `wordbanks.${wordBankId}.words`);
      const newWords = oldWords.filter(oldId => oldId !== id);
      const wordState = dotProp.set(
        state,
        `wordbanks.${wordBankId}.words`,
        newWords
      );
      return dotProp.delete(wordState, `words.${id}`);
    }

    default:
      return state;
  }
}

const removeWordBanks = (state, classId) => {
  const wordBanks = dotProp.get(state, `classrooms.${classId}.wordbanks`);
  let newState = dotProp.get(state, "", state);
  for (const wordBank of wordBanks) {
    newState = removeWords(newState, wordBank);
    newState = dotProp.delete(newState, `wordbanks.${wordBank}`);
  }
  return newState;
};

const removeWords = (state, wordBankId) => {
  const words = dotProp.get(state, `wordbanks.${wordBankId}.words`);
  let newState = dotProp.get(state, "", state);
  for (const word of words) {
    newState = dotProp.delete(newState, `words.${word}`);
  }
  return newState;
};

/*
const entities = {
  user: {
      id: 1,
      firstName: "test",
      lastName: "ing",
      email: "a@gmail.com",
      password: "password",
      classrooms: ["class"]
    }
  },
  classrooms: {
    "AAAA": {
      id: "AAAA",
      author: "a@gmail.com",
      wordbanks: ["BBBB"]
    },
    "BBBB": {
      id: "BBBB",
      author: "b@gmail.com",
      wordbanks: ["BBBB"]
    }
  },
  wordbanks: {
    "BBBB": {
      id: "BBBB",
      words: ['test', 'test2']
    }
  }
};

const wordbank = new schema.Entity("wordbanks");
const classroom = new schema.Entity("classrooms", { wordbanks: [wordbank] });
const user = new schema.Entity("users", { classrooms: [classroom] });

const mySchema = { user: user };

const denormalizedData = denormalize({ user: "a@gmail.com"}, mySchema, entities);
console.log(denormalizedData)
*/

const rootReducer = combineReducers({
  userData: userDataReducer
});

export default rootReducer;
