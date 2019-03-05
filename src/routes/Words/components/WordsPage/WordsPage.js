import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import Scrollbar from 'react-scrollbars-custom'
import ItemTile from 'components/ItemTile'
import NewItemTile from 'components/NewItemTile'
import NewWordDialog from '../NewWordDialog'
import { Dictaphone } from 'components/Dictaphone'

const WordsPage = ({
  words,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteWord,
  addWord,
  classes,
  match
}) => {
  const { wordbankId = null } = match.params
  return (
    <div>
      <Scrollbar className={classes.scrollbar}>
        <div className={classes.root}>
          <NewWordDialog
            onSubmit={addWord}
            open={newDialogOpen}
            onRequestClose={toggleDialog}
          />
          <div className={classes.tiles}>
            <NewItemTile onClick={toggleDialog} />
            {!isEmpty(words) &&
              words.map((word, i) => (
                <ItemTile
                  key={`Word-${word.id}-${i}`}
                  name={word.name}
                  onSelect={() => {}}
                  onDelete={() => deleteWord(word.id)}
                />
              ))}
          </div>
        </div>
      </Scrollbar>
      {wordbankId !== null && <Dictaphone words={words} />}
    </div>
  )
}

WordsPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  words: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  deleteWord: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  addWord: PropTypes.func.isRequired // from enhancer (withHandlers - firebase)
}

export default WordsPage
