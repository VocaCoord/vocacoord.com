/*
Local Data Structure

**Wordbank**
- id: string
- name: string
- words: [Word]

*/

import { attr, fk, Model } from 'redux-orm';
import uuidv1 from 'uuid/v1';

class Wordbank extends Model {}

Wordbank.modelName = 'Wordbank';
Wordbank.fields = {
  id: attr({ getDefault: () => uuidv1() }),
  name: attr(),
  classroom: fk('Classroom', 'wordbanks')
};

export default Wordbank;
