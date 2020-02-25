import React, {Component} from 'react';
import { Input, Icon, Button, message } from 'antd';
import '../style.css';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {

  state = {
    signUpFirstName: '',
    signUpLastName: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpExist: true,
    signInEmail: '',
    signInPassword: '',
    signInExist: false
  }

  signUpSubmit = () => {

    var userData = JSON.stringify({
      firstName: this.state.signUpFirstName,
      lastName: this.state.signUpLastName,
      email: this.state.signUpEmail,
      password: this.state.signUpPassword
    });

    fetch('/users/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/Json'},
      body: userData
    })
    .then((response) => {
      return response.json()
    })
    .then((data)=>{
      if (data.result === false) {
        this.setState({signUpExist: false});
        this.props.signUpUser(data.user)
      } else {
        message.error('Sorry, this email is already used...')
      }
    })
    .catch((err)=>{
      console.log('fetch error...', err)
    })
  };

  signInSubmit = () => {

    fetch(`/users/signin/${this.state.signInEmail}/${this.state.signInPassword}`)
    .then(response => response.json())
    .then(data => {
      if (data.result === false) {
        data.error === 'mauvais mot de passe...'
        ? message.error('Wrong password... Please try again')
        : message.error('Wrong email... Please try again')
      } else {
        this.setState({signInExist: true});
        this.props.signInUser(data.user)
      }
    })
    .catch(err => console.log('fetch error...', err))
  }

  render() {

    if (!this.state.signUpExist || this.state.signInExist) {
      return <Redirect to='/home' />
    }

    return (
      <div className="login">

        <div className="sign">
          <Input
            className="login-input"
            placeholder="Enter your first name"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({signUpFirstName: e.target.value})}
          />
          <Input
            className="login-input"
            placeholder="Enter your  last name"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({signUpLastName: e.target.value})}
          />
          <Input
            className="login-input"
            placeholder="Enter your email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({signUpEmail: e.target.value})}
          />
          <Input.Password
            className="login-input"
            placeholder="Enter your password"
            prefix={<Icon type="question" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({signUpPassword: e.target.value})}
          />
          <Button type="primary" size='large' onClick={this.signUpSubmit}>
            Sign up
          </Button>
        </div>

        <div className="sign">
          <Input
            className="login-input"
            placeholder="Enter your email"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({signInEmail: e.target.value})}
          />
          <Input.Password
            className="login-input"
            placeholder="Enter your password"
            prefix={<Icon type="question" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={e => this.setState({signInPassword: e.target.value})}
          />
          <Button type="primary" size='large' onClick={this.signInSubmit}>
            Sign in
          </Button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUpUser: function(user) {
      dispatch({type: 'signUp', user: user})
    },
    signInUser: function(user) {
      dispatch({type: 'signIn', user: user})
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
