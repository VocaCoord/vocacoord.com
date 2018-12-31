import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logOutUser } from '../actions/index';
import VCLogo from './Icons';
import '../VocaCoord.css';

class Header extends Component {
  constructor(props) {
    super(props);
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName('body')[0];
    this.state = {
      width: w.innerWidth || documentElement.clientWidth || body.clientWidth
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentDidMount() {
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleLogOut = () => {
    const { dispatch } = this.props;
    dispatch(logOutUser());
  };

  updateDimensions = () => {
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName('body')[0];
    const width =
      w.innerWidth || documentElement.clientWidth || body.clientWidth;

    this.setState({ width });
  };

  render() {
    const { authenticated } = this.props;
    const { width } = this.state;
    return (
      <div className="header">
        <div className="header__logo">
          <Link to="/" className="link">
            <div className="header__logo--svg">
              <VCLogo />
            </div>
            {width > 510 && <h1 className="header__logo--text">ocaCoord</h1>}
          </Link>
        </div>
        {authenticated ? (
          <div className="App-header-info">
            <Link to="/classrooms">
              <Button color="primary">Your Classes</Button>
            </Link>{' '}
            <Button color="primary" outline onClick={() => this.handleLogOut()}>
              Log Out
            </Button>
          </div>
        ) : (
          <div className="App-login-buttons">
            <Link to="/login">
              <Button color="primary">Log In</Button>
            </Link>{' '}
            <Link to="/signup">
              <Button color="primary" outline>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
