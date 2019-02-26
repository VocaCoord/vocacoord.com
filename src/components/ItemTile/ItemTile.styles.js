export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '200px',
    width: '300px',
    margin: theme.spacing.unit * 0.5,
    padding: theme.spacing.unit * 1.3
  },
  media: {
    height: '201px',
    minHeight: '201px',
    width: '301px',
    position: 'relative',
    backgroundSize: '100%',
    transform: 'translate(-11px, -11px)'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '279.2px',
    transform: 'translate(3px, 0px)'
  },
  name: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 800ms cubic-bezier(0.25,0.1,0.25,1) 0ms',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    ':hover': {
      color: ''
    },
    ':visited': {
      textDecoration: 'none'
    },
    transform: 'translate(10px, 10px)'
  }
})
