export default theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    overflow: 'hidden'
  },
  inputs: {
    ...theme.flexColumnCenter
  },
  buttons: {
    ...theme.flexColumnCenter
  },
  scrollbar: {
    width: 500,
    height: 573,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 20,
    color: '#7487a3',
    marginBottom: 20
  },
  titleContainer: {
    display: 'flex'
  },
  titleText: {
    margin: '0 auto'
  },
  switchButton: {
    float: 'right'
  }
})
