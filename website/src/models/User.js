/*
Local Data Structure

**User**
- id: string
- firstName: string
- lastName: string
- email: string
- classrooms: [Classroom]

*/

import { attr, Model } from 'redux-orm';
import uuidv1 from 'uuid/v1';
import { LOG_OUT } from '../constants/ActionTypes';

class User extends Model {
  // eslint-disable-next-line no-shadow
  static reducer(action, User) {
    const { type } = action;
    switch (type) {
      case LOG_OUT:
        User.first().update({ authenticated: false });
        break;

      default:
        break;
    }
  }
}

User.modelName = 'User';
User.fields = {
  id: attr({ getDefault: () => uuidv1() }),
  firstName: attr(),
  lastName: attr(),
  email: attr(),
  authenticated: attr({ getDefault: () => true })
};

export default User;
