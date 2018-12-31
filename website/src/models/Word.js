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

class Word extends Model {}

Word.modelName = 'Word';
Word.fields = {
  id: attr({ getDefault: () => uuidv1() }),
  name: attr(),
  definition: attr(),
  image: attr(),
  wordbank: fk('Wordbank', 'words')
};

export default Word;
