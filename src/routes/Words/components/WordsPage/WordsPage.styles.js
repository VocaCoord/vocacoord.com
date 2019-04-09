export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing.unit * 4,
    flexGrow: '2',
    boxSizing: 'border-box',
    overflowY: 'none'
  },
  header: {
    height: 48,
    borderBottom: '1px solid #dadce0',
    alignItems: 'center',
    display: 'flex'
  },
  headerText: {
    fontFamily: 'Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    fontVariantLigatures: 'no-contextual',
    fontSize: 18,
    borderRadius: '8px',
    lineHeight: '24px',
    margin: '2px 0',
    padding: '4px 8px 4px'
  },
  scrollbar: {
    width: '100vw',
    height: 'calc(100vh - 64px - 48px)',
    display: 'flex',
    flexDirection: 'row'
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '-webkit-flex-flow': 'row wrap'
  }
})
