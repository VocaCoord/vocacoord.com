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

    /* works */
    case "ADD_BANK": {
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
      const oldWordBanks = dotProp.get(
        state,
        `classrooms.${classId}.wordbanks`
      );
      const newWordBanks = oldWordBanks.filter(oldId => oldId !== id);
      const classState = dotProp.set(
        state,
        `classrooms.${classId}.wordbanks`,
        newWordBanks
      );
      return dotProp.delete(classState, `wordbanks.${id}`);
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
