import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import Scrollbar from 'react-scrollbars-custom'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import ItemTile from 'components/ItemTile'
import NewItemTile from 'components/NewItemTile'
import AddWordDialog from '../AddWordDialog'
import EditWordDialog from '../EditWordDialog'
import LogsDialog from '../LogsDialog'
import Dictaphone from 'components/Dictaphone'

const WordsPage = ({
  words,
  classrooms: [{ classCode }],
  auth,
  addDialogOpen,
  toggleAddDialog,
  editDialogOpen,
  toggleEditDialog,
  logsDialogOpen,
  toggleLogsDialog,
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
        <IconButton onClick={toggleLogsDialog} className={classes.infoButton}>
          <InfoIcon />
        </IconButton>
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
          <LogsDialog open={logsDialogOpen} onRequestClose={toggleLogsDialog} />
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
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  auth: PropTypes.object,
  words: PropTypes.array,
  addDialogOpen: PropTypes.bool,
  toggleAddDialog: PropTypes.func.isRequired,
  editDialogOpen: PropTypes.bool,
  toggleEditDialog: PropTypes.func.isRequired,
  deleteWord: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired
}

export default WordsPage
