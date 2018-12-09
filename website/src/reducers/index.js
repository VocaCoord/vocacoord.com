import dotProp from 'dot-prop-immutable';
import { combineReducers } from 'redux';
import uuidv1 from 'uuid/v1';
import * as types from '../constants/ActionTypes';
import { removeWords, removeWordBanks } from '../utils/index';

const initialState = {
  classrooms: {},
  wordbanks: {},
  words: {},
  user: {
    authenticated: false
  }
};

function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CLASS: {
      const uuid = uuidv1();
      return dotProp.set(state, `classrooms.${uuid}`, {
        ...action.payload,
        id: uuid,
        wordbanks: []
      });
    }

    case types.EDIT_CLASS: {
      const { id, name } = action.payload;
      return dotProp.set(state, `classrooms.${id}.name`, name);
    }

    case types.REMOVE_CLASS: {
      const { id } = action.payload;
      const newClassState = removeWordBanks(state, id);
      return dotProp.delete(newClassState, `classrooms.${id}`);
    }

    case types.ADD_BANK: {
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

    case types.EDIT_BANK: {
      const { id, name } = action.payload;
      return dotProp.set(state, `wordbanks.${id}.name`, name);
    }

    case types.REMOVE_BANK: {
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

    case types.ADD_WORD: {
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

    case types.EDIT_WORD: {
      const { id, name, definition, image } = action.payload;
      let newState = dotProp.get(state, '', state);
      if (name) newState = dotProp.set(newState, `words.${id}.name`, name);
      if (definition)
        newState = dotProp.set(newState, `words.${id}.definition`, definition);
      if (image) newState = dotProp.set(newState, `words.${id}.image`, image);
      return newState;
    }

    case types.REMOVE_WORD: {
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

    case types.SIGNUP_FAILURE:
    case types.SIGNUP_SUCCESS: {
      return dotProp.set(state, `user`, { ...action.payload });
    }

    case types.LOGIN_FAILURE:
    case types.LOGIN_SUCCESS: {
      const {
        authenticated,
        firstName,
        lastName,
        email,
        data
      } = action.payload;
      const newUser = {
        authenticated,
        firstName,
        lastName,
        email
      };
      let newState = dotProp.set(state, `user`, newUser);
      newState = dotProp.set(newState, `classrooms`, data.classrooms);
      newState = dotProp.set(newState, `wordbanks`, data.wordbanks);
      return dotProp.set(newState, `words`, data.words);
    }

    case types.LOG_OUT: {
      return dotProp.set(state, `user`, { authenticated: false });
    }

    default:
      return state;
  }
}

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
