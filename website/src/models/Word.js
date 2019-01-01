/*
Local Data Structure

**Word**
- id: string
- name: string
- definition: string
- image: string

*/

import { attr, fk, Model } from 'redux-orm';
import uuidv1 from 'uuid/v1';
import { CREATE_WORD, EDIT_WORD, REMOVE_WORD } from '../constants/ActionTypes';

class Word extends Model {
  // eslint-disable-next-line no-shadow
  static reducer(action, Word) {
    const { payload, type } = action;
    switch (type) {
      case CREATE_WORD:
        Word.create({ ...payload });
        break;

      case EDIT_WORD:
        Word.withId(payload.id).update(payload);
        break;

      case REMOVE_WORD:
        Word.withId(payload.id).delete();
        break;

      default:
        break;
    }
  }
}

Word.modelName = 'Word';
Word.fields = {
  id: attr({ getDefault: () => uuidv1() }),
  name: attr(),
  definition: attr(),
  image: attr(),
  bankId: fk({
    to: 'Wordbank',
    relatedName: 'words'
  })
};

export default Word;
