import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import orm from '../models';

const ormSelector = state => state.orm;

export const userSelector = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => session.User.first().ref)
);

export const classSelector = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => session.Classroom.all().toRefArray())
);

const classIdSelector = (state, props) => {
  const { match } = props;
  const { classroom } = match.params;
  return classroom;
};

export const wordbankSelector = createSelector(
  ormSelector,
  classIdSelector,
  ormCreateSelector(orm, (session, classId) =>
    session.Wordbank.filter({ classId }).toRefArray()
  )
);

const bankIdSelector = (state, props) => {
  const { match } = props;
  const { wordbank } = match.params;
  return wordbank;
};

export const wordSelector = createSelector(
  ormSelector,
  bankIdSelector,
  ormCreateSelector(orm, (session, bankId) =>
    session.Word.filter({ bankId }).toRefArray()
  )
);
