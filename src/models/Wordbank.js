/*
Local Data Structure

**Wordbank**
- id: string
- name: string
- words: [Word]

*/

import { attr, fk, Model } from 'redux-orm';
import uuidv1 from 'uuid/v1';
import { CREATE_BANK, EDIT_BANK, REMOVE_BANK } from '../constants/ActionTypes';

class Wordbank extends Model {
  // eslint-disable-next-line no-shadow
  static reducer(action, Wordbank, session) {
    const { payload, type } = action;
    switch (type) {
      case CREATE_BANK:
        Wordbank.create({ ...payload });
        break;

      case EDIT_BANK:
        Wordbank.withId(payload.id).update(payload);
        break;

      case REMOVE_BANK:
        Wordbank.withId(payload.id).delete();
        session.Word.filter({ bankId: null }).delete();
        break;

      default:
        break;
    }
  }
}

Wordbank.modelName = 'Wordbank';
Wordbank.fields = {
  id: attr({ getDefault: () => uuidv1() }),
  name: attr(),
  classId: fk({
    to: 'Classroom',
    relatedName: 'wordbanks'
  })
};

export default Wordbank;
