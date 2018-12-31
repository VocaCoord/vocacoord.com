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

export const wordbankSelector = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => session.Wordbank.all().toRefArray())
);

export const wordSelector = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => session.Word.all().toRefArray())
);
