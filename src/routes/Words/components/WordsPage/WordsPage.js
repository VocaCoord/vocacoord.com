import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import Scrollbar from 'react-scrollbars-custom'
import ItemTile from 'components/ItemTile'
import NewItemTile from 'components/NewItemTile'
import AddWordDialog from '../AddWordDialog'
import EditWordDialog from '../EditWordDialog'
import { Dictaphone } from 'components/Dictaphone'

const WordsPage = ({
  words,
  classrooms: [{ classCode }],
  auth,
  addDialogOpen,
  toggleAddDialog,
  editDialogOpen,
  toggleEditDialog,
  deleteWord,
  addWord,
  editWord,
  classes,
  match,
  selected,
  wordbankName
}) => {
  const { wordbankId = null } = match.params
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.headerText}>
          Words
          {wordbankName &&
            ` in the ${wordbankName} wordbank. Class code: ${classCode}`}{' '}
        </div>
      </div>
      <Scrollbar className={classes.scrollbar}>
        <div className={classes.root}>
          <AddWordDialog
            onSubmit={addWord}
            open={addDialogOpen}
            onRequestClose={toggleAddDialog}
          />
          <EditWordDialog
            onSubmit={editWord}
            open={editDialogOpen}
            onRequestClose={toggleEditDialog}
            initialValues={selected}
          />
          <div className={classes.tiles}>
            <NewItemTile onClick={toggleAddDialog} />
            {!isEmpty(words) &&
              words.map((word, i) => (
                <ItemTile
                  key={`Word-${word.id}-${i}`}
                  onSelect={() => {}}
                  onDelete={() => deleteWord(word.id)}
                  onOpenEdit={toggleEditDialog}
                  item={word}
                />
              ))}
          </div>
        </div>
      </Scrollbar>
      {wordbankId !== null && (
        <Dictaphone words={words} classCode={classCode} />
      )}
    </div>
  )
}

WordsPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  match: PropTypes.object.isRequired, // from enhancer (withRouter)
  auth: PropTypes.object, // from enhancer (connect + firebaseConnect - firebase)
  words: PropTypes.array, // from enhancer (connect + firebaseConnect - firebase)
  addDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleAddDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  editDialogOpen: PropTypes.bool, // from enhancer (withStateHandlers)
  toggleEditDialog: PropTypes.func.isRequired, // from enhancer (withStateHandlers)
  deleteWord: PropTypes.func.isRequired, // from enhancer (withHandlers - firebase)
  addWord: PropTypes.func.isRequired // from enhancer (withHandlers - firebase)
}

export default WordsPage
