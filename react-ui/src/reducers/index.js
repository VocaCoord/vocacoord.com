import merge from "lodash/merge";
import dotProp from "dot-prop-immutable";
import { combineReducers } from "redux";
import { sessionReducer } from "redux-react-session";

const initialState = {
  user: {},
  classrooms: {},
  wordbanks: {}
};

let id = 0;
function userDataReducer(state = initialState, action) {
  id++;
  switch (action.type) {
    /* works */
    case "LOAD_USER": {
      let { email } = action.payload;
      email = email.replace(/\./g, "");
      const user = merge({}, { ...action.payload }, { id, classrooms: [] });
      return merge({}, state, { user });
    }

    /* works, but there is a race condition */
    case "ADD_CLASS": {
      const { id } = action.payload;
      const classroom = merge({}, { ...action.payload }, { id, wordbanks: [] });
      const newUserState = dotProp.merge(state, "user.classrooms", [id]);
      const newClassState = dotProp.set(
        newUserState,
        `classrooms.${id}`,
        classroom
      );
      return newClassState;
    }

    /* TODO */
    case "DEL_CLASS": {
      return;
    }

    /* TODO */
    case "EDIT_CLASS": {
      return;
    }

    /* works */
    case "ADD_BANK": {
      const { classID } = action.payload;
      const wordbank = merge({}, { ...action.payload }, { id });

      const newClassState = dotProp.merge(
        state,
        `classrooms.${classID}.wordbanks`,
        [id]
      );
      const newWordBankState = dotProp.set(
        newClassState,
        `wordbanks.${id}`,
        wordbank
      );
      console.log("new bank state", newWordBankState);
      return newWordBankState;
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
      return dotProp.set(state, `wordbanks.${action.payload.id}.words`, [
        ...oldWords,
        action.payload.word
      ]);
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
  session: sessionReducer,
  userData: userDataReducer
});

export default rootReducer;
