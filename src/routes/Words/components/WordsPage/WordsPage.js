import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { Route } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'
import ItemTile from 'components/ItemTile'
import NewItemTile from 'components/NewItemTile'
import NewWordDialog from '../NewWordDialog'
import Dictaphone from 'components/Dictaphone';

const WordsPage = ({
  words,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteWord,
  addWord,
  classes,
  match,
  goToWord
}) => {
  return (
    <Route
      exact
      path={match.path}
      render={() => (
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
                  words.map((word, i) => {
                    const { wordbankId = null } = match.params
                    if (word.wordbankId !== wordbankId && wordbankId !== null)
                      return null
                    return (
                      <ItemTile
                        key={`Word-${word.id}-${i}`}
                        name={word.name}
                        onSelect={() => goToWord(word.id)}
                        onDelete={() => deleteWord(word.id)}
                      />
                    )
                  })}
              </div>
            </div>
          </Scrollbar>
          <Dictaphone words={['test', 'snake']} />
        </div>
      )}
    />
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
  addWord: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  goToWord: PropTypes.func.isRequired // from enhancer (withHandlers - router)
}

export default WordsPage
