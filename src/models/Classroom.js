/*
Local Data Structure

**Classroom**
- id: string
- name: string
- code: string
- wordbanks: [Wordbank]

*/

import { attr, fk, Model } from 'redux-orm';
import uuidv1 from 'uuid/v1';
import {
  CREATE_CLASS,
  EDIT_CLASS,
  REMOVE_CLASS
} from '../constants/ActionTypes';

class Classroom extends Model {
  // eslint-disable-next-line no-shadow
  static reducer(action, Classroom, session) {
    const { payload, type } = action;
    switch (type) {
      case CREATE_CLASS:
        Classroom.create({ ...payload });
        break;

      case EDIT_CLASS:
        Classroom.withId(payload.id).update(payload);
        break;

      case REMOVE_CLASS:
        Classroom.withId(payload.id).delete();
        session.Wordbank.filter({ classId: null }).delete();
        session.Word.filter({ bankId: null }).delete();
        break;

      default:
        break;
    }
  }
}

Classroom.modelName = 'Classroom';
Classroom.fields = {
  id: attr({ getDefault: () => uuidv1() }),
  name: attr(),
  code: attr(),
  userId: fk({
    to: 'User',
    relatedName: 'classrooms'
  })
};

export default Classroom;
