export default theme => ({
  root: {
    maxWidth: 400,
    width: 300,
    height: 300,
    margin: theme.spacing.unit * 0.5
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  content: {
    paddingTop: 6,
    paddingBottom: 6
  },
  name: {
    cursor: 'pointer'
  },
  definition: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: 'default'
  },
  actions: {
    display: 'flex'
  }
})
