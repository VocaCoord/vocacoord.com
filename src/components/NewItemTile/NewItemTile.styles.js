export default theme => ({
  root: {
    ...theme.flexRowCenter,
    alignItems: 'center',
    cursor: 'pointer',
    maxWidth: 400,
    height: 300,
    width: 300,
    margin: theme.spacing.unit * 0.5,
    padding: theme.spacing.unit * 1.3,
    overflow: 'hidden'
  }
})
