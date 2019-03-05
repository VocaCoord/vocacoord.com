import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import { Route, Switch } from 'react-router-dom'
import Scrollbar from 'react-scrollbars-custom'
import ItemTile from 'components/ItemTile'
import NewItemTile from 'components/NewItemTile'
import { renderChildren } from 'utils/router'
import NewWordbankDialog from '../NewWordbankDialog'
import WordsRoute from 'routes/Words/secondary'

const WordbanksPage = ({
  wordbanks,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteWordbank,
  addWordbank,
  classes,
  match,
  goToWords
}) => (
  <Switch>
    {renderChildren([WordsRoute], match)}
    <Route
      exact
      path={match.path}
      render={() => (
        <Scrollbar className={classes.scrollbar}>
          <div className={classes.root}>
            <NewWordbankDialog
              onSubmit={addWordbank}
              open={newDialogOpen}
              onRequestClose={toggleDialog}
            />
            <div className={classes.tiles}>
              <NewItemTile onClick={toggleDialog} />
              {!isEmpty(wordbanks) &&
                wordbanks.map((wordbank, i) => (
                  <ItemTile
                    key={`Wordbank-${wordbank.id}-${i}`}
                    name={wordbank.name}
                    onSelect={() => goToWords(wordbank.id)}
                    onDelete={() => deleteWordbank(wordbank.id)}
                  />
                ))}
            </div>
          </div>
        </Scrollbar>
      )}
    />
  </Switch>
)

WordbanksPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  wordbanks: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  newDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  deleteWordbank: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  addWordbank: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  goToWords: PropTypes.func.isRequired // from enhancer (withHandlers - router)
}

export default WordbanksPage
