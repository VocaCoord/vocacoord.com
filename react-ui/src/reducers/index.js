import { combineReducers } from "redux";
import merge from "lodash/merge";
import { denormalize, schema } from "normalizr";
import dotProp from "dot-prop-immutable";

const initialState = {
  user: {},
  classrooms: {},
  wordbanks: {}
};

let id = 0;
export function userDataReducer(state = initialState, action) {
  id++;
  switch (action.type) {
    /* works */
    case "LOAD_USER": {
      const user = merge(
        {},
        { [id]: { ...action.payload } },
        { [id]: { id, classrooms: [] } }
      );
      return merge({}, state, { user });
    }

    case "ADD_CLASS": {

    }

    case "DEL_CLASS": {

    }

    case "EDIT_CLASS": {

    }

    /* works */
    case "ADD_BANK": {
      const wordbank = merge(
        {},
        { [id]: { ...action.payload } },
        { [id]: { id, words: ["test"] } }
      );
      const wordbanks = merge({}, state.wordbanks, wordbank);
      return merge({}, state, { wordbanks });
    }
    /* works */
    case "DEL_BANK": {
      return dotProp.delete(state, `wordbanks.${action.payload.id}`);
    }
    /* works */
    case "EDIT_BANK": {
      const wordbank = dotProp.get(state, `wordbanks.${action.payload.id}`);
      wordbank.name = action.payload.name;
      return dotProp.set(state, `wordbanks.${action.payload.id}`, wordbank);
    }

    /* works */
    case "ADD_WORD": {
      const oldWords = dotProp.get(
        state,
        `wordbanks.${action.payload.id}.words`
      );
      return dotProp.set(state, `wordbanks.${action.payload.id}.words`, [...oldWords, action.payload.word]);
    }
    /* works */
    case "DEL_WORD": {
      const oldWords = dotProp.get(
        state,
        `wordbanks.${action.payload.id}.words`
      );
      const newWords = oldWords.filter(word => word !== action.payload.word);
      return dotProp.set(
        state,
        `wordbanks.${action.payload.id}.words`,
        newWords
      );
    }
    /* works */
    case "EDIT_WORD": {
      let words = dotProp.get(state, `wordbanks.${action.payload.id}.words`);
      words.forEach((word, i) => {
        if (word === action.payload.oldWord) words[i] = action.payload.newWord;
      });
      return dotProp.set(state, `wordbanks.${action.payload.id}.words`, words);
    }

    /* works */
    case "SHOW_STORE":
      console.log(state);
      return state;

    default:
      return state;
  }
}
/*
const entities = {
  user: {
    "a@gmail.com": {
      id: 1,
      firstName: "test",
      lastName: "ing",
      email: "a@gmail.com",
      password: "password",
      classrooms: ["class"]
    }
  },
  classrooms: {
    "class": {
      id: "AAAA",
      author: "a@gmail.com",
      wordbanks: ["BBBB"]
    },
    "a@gmail.com": {
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
