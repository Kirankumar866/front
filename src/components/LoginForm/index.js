import { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
import './index.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  };

  onChangeemail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    });
    
    history.replace('/');

  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
    console.log(errorMsg)
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const userDetails = { email, password };
    const url = 'http://localhost:15796/login';
    
    axios.post(url, userDetails)
    .then((result) => {
        if (result.data.status === 'ok') {
            this.onSubmitSuccess(result.data.user);
        } else {
            this.onSubmitFailure(result.data.message);
        }
    })
    .catch((error) => {
        console.log("error", error);
    });

    
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderemailField = () => {
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeemail}
          placeholder="Email"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderemailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <Link to="/register">
            <button type="button" className="login-button signup">
              SignUp
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginForm;
