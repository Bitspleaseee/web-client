import { Component } from 'preact'
import linkState from 'linkstate'
import { connect } from 'preact-redux'
import { route } from 'preact-router'
import { Grid, Cell } from 'preact-fluid'

import { authenticate, deauthenticate } from '../actions/auth.js'
import WarningCard from '../components/WarningCard.js'
import Form from '../components/Form.js'

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  render (
    { isAuthPending, isAuth, authUsername, authenticate, deauthenticate },
    { username, password }
  ) {
    if (isAuth) {
      route('/dashboard', true)
    }
    return <Grid columns={'1fr'} style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
      <Cell middle>
        <h1>Login</h1>
      </Cell>
      { isAuth &&
      <Cell middle>
        <WarningCard
          message={`You are already logged in as ${authUsername}`}
          label='Logout'
          onClick={deauthenticate}
        />
      </Cell>
      }
      <Cell middle>
        <Form
          inputs={[
            {
              label: 'Username',
              value: username,
              disabled: isAuth,
              onChange: linkState(this, 'username')
            },
            {
              label: 'Password',
              type: 'password',
              value: password,
              disabled: isAuth,
              onChange: linkState(this, 'password')
            }
          ]}
          actions={[
            {
              label: 'Login',
              loading: isAuthPending,
              disabled: isAuth,
              primary: true,
              onClick: _ => authenticate({ username, password })
            },
            {
              label: 'Don\'t have an account?',
              loading: false,
              disabled: isAuth,
              onClick: _ => route('/signup')
            }
          ]} />
      </Cell>
    </Grid>
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthPending: auth.pending,
  isAuth: auth.authenticated,
  authUsername: auth.username
})

const mapDispatchToProps = dispatch => ({
  authenticate: (data) => dispatch(authenticate(data)),
  deauthenticate: () => dispatch(deauthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
