import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
class Signup extends Component{
    state = {
        email: '',
        username: '',
        password: '',
        redirectToLogin: false,
        
      }
      onChangeUsername = event => {
        this.setState({username: event.target.value})
      }
      onChangeEmail = event => {
        this.setState({email: event.target.value})
      }
    
      onChangePassword = event => {
        this.setState({password: event.target.value})
      }

      submitSignup = e => {
        e.preventDefault();
        const { username, email, password } = this.state;
        const userDetails = { email, username, password };
    
        axios.post('http://localhost:15796/register', userDetails)
        .then((result) => {
            console.log(result);
            this.setState({ redirectToLogin: true });
          })
          .catch((error) => {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
          });
      };
      

      renderPasswordField = () => {
        const {password} = this.state
    
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
        )
      }

      renderUsernameField = () => {
        const {username} = this.state
    
        return (
          <>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
          </>
        )
      }

      renderEmailField = () => {
        const {email} = this.state
    
        return (
          <>
            <label className="input-label" htmlFor="email">
              Email ID
            </label>
            <input
              type= "email"
              id="email"
              className="username-input-field"
              value={email}
              onChange={this.onChangeEmail}
              placeholder="Email"
            />
          </>
        )
      }

      render(){
        const {redirectToLogin} = this.state
        if (redirectToLogin) {
            return <Redirect to="/login" />;
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
              <form className="form-container" onSubmit={this.submitSignup}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  className="login-website-logo-desktop-img"
                  alt="website logo"
                />
                <div className="input-container">{this.renderEmailField()}</div>
                <div className="input-container">{this.renderUsernameField()}</div>
                <div className="input-container">{this.renderPasswordField()}</div>
                <button type="submit" className="login-button">
                  Register
                </button>
                
              </form>
            </div>
          )
      }

}

export default Signup