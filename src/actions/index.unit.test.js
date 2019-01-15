import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import uuidv1 from 'uuid/v1';
import * as types from '../constants/ActionTypes';
import * as actions from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('Class Action Creators', () => {
  it('should create an action to add a classroom', () => {
    const code = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    const name = 'Test classroom';
    const expectedAction = {
      type: types.CREATE_CLASS,
      payload: { code, name }
    };

    expect(actions.createClass(code, name)).toEqual(expectedAction);
  });

  it('should create an action to edit a classroom', () => {
    const id = uuidv1();
    const name = 'New test classroom name';
    const expectedAction = {
      type: types.EDIT_CLASS,
      payload: { id, name }
    };

    expect(actions.editClass(id, name)).toEqual(expectedAction);
  });

  it('should create an action to remove a classroom', () => {
    const id = uuidv1();
    const expectedAction = {
      type: types.REMOVE_CLASS,
      payload: { id }
    };

    expect(actions.removeClass(id)).toEqual(expectedAction);
  });
});

describe('Word Bank Action Creators', () => {
  it('should create an action to add a word bank', () => {
    const classId = uuidv1();
    const name = 'Test word bank';
    const expectedAction = {
      type: types.CREATE_BANK,
      payload: { classId, name }
    };

    expect(actions.createBank(classId, name)).toEqual(expectedAction);
  });

  it('should create an action to edit a word bank', () => {
    const id = uuidv1();
    const name = 'New test word bank name';
    const expectedAction = {
      type: types.EDIT_BANK,
      payload: { id, name }
    };

    expect(actions.editBank(id, name)).toEqual(expectedAction);
  });

  it('should create an action to remove a word bank', () => {
    const classId = uuidv1();
    const id = uuidv1();
    const expectedAction = {
      type: types.REMOVE_BANK,
      payload: { classId, id }
    };

    expect(actions.removeBank(classId, id)).toEqual(expectedAction);
  });
});

describe('Word Action Creators', () => {
  it('should create an action to add a word', () => {
    const bankId = uuidv1();
    const word = {
      name: 'Test word',
      definition: 'Test word definition',
      image: 'Test word image'
    };
    const expectedAction = {
      type: types.CREATE_WORD,
      payload: { bankId, ...word }
    };

    expect(actions.createWord(bankId, word)).toEqual(expectedAction);
  });

  it('should create an action to edit a word', () => {
    const id = uuidv1();
    const word = {
      name: 'New test word',
      definition: 'New test word definition',
      image: 'New test word image'
    };
    const expectedAction = {
      type: types.EDIT_WORD,
      payload: { id, ...word }
    };

    expect(actions.editWord(id, word)).toEqual(expectedAction);
  });

  it('should create an action to remove a word', () => {
    const bankId = uuidv1();
    const id = uuidv1();
    const expectedAction = {
      type: types.REMOVE_WORD,
      payload: { bankId, id }
    };

    expect(actions.removeWord(bankId, id)).toEqual(expectedAction);
  });
});

describe('User Action Creators', () => {
  it('should create an action to log out the user', () => {
    const expectedAction = {
      type: types.LOG_OUT
    };

    expect(actions.logOutUser()).toEqual(expectedAction);
  });
});
