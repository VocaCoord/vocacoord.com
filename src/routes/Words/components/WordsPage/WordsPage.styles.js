export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing.unit * 4,
    flexGrow: '2',
    boxSizing: 'border-box',
    overflowY: 'none'
  },
  scrollbar: {
    width: '100vw',
    height: 'calc(100vh - 64px)',
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
