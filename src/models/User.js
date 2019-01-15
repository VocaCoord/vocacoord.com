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
import { LOG_OUT, AUTH_USER } from '../constants/ActionTypes';

class User extends Model {
  // eslint-disable-next-line no-shadow
  static reducer(action, User) {
    const { type, payload } = action;
    const { user } = payload || { user: null };
    switch (type) {
      case AUTH_USER:
        User.first().update({ authenticated: !!user });
        break;

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
