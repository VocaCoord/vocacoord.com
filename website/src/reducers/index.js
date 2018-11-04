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
  let uuid = uuidv1();

  switch (action.type) {
    /* works */
    case "ADD_CLASS": {
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
      return dotProp.delete(state, `classrooms.${id}`);
    }

    /* TODO */
    case "ADD_BANK": {
      return;
    }

    /* TODO */
    case "EDIT_BANK": {
      return;
    }

    /* TODO */
    case "REMOVE_BANK": {
      return;
    }

    /* TODO */
    case "ADD_WORD": {
      return;
    }

    /* TODO */
    case "EDIT_WORD": {
      return;
    }

    /* TODO */
    case "REMOVE_WORD": {
      return;
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
  userData: userDataReducer
});

export default rootReducer;
