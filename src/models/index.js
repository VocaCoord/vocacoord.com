import { ORM } from 'redux-orm';
import User from './User';
import Classroom from './Classroom';
import Wordbank from './Wordbank';
import Word from './Word';

const orm = new ORM();
orm.register(User, Classroom, Wordbank, Word);

export default orm;
