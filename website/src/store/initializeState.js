import orm from '../models';

const initializeState = () => {
  const state = orm.getEmptyState();
  const session = orm.mutableSession(state);
  const { User } = session;
  User.create({});

  return {
    orm: state
  };
};

export default initializeState;
