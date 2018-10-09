import { Component } from 'preact'
import linkState from 'linkstate'
import { connect } from 'preact-redux'
import { route } from 'preact-router'
import { Grid, Cell } from 'preact-fluid'

import { deauthenticate, registerUser } from '../actions/auth.js'
import WarningCard from '../components/WarningCard.js'
import Form from '../components/Form.js'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  };

  render (
    { isAuthPending, isAuth, authUsername, registerUser, deauthenticate },
    { username, password, email }
  ) {
    if (isAuth) {
      route('/dashboard', true)
    }
    return <Grid columns={'1fr'} style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
      <Cell middle>
        <h1>Signup</h1>
      </Cell>
      { isAuth &&
      <Cell middle>
        <WarningCard
          message={`You are already logged in as '${authUsername}'`}
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
              label: 'Email',
              type: 'email',
              value: email,
              disabled: isAuth,
              onChange: linkState(this, 'email')
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
              label: 'Signup',
              loading: isAuthPending,
              disabled: isAuth,
              primary: true,
              onClick: _ => registerUser({ username, email, password })
            },
            {
              label: 'Already have an account?',
              loading: false,
              disabled: isAuth,
              onClick: _ => route('/login')
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
  registerUser: (data) => dispatch(registerUser(data)),
  deauthenticate: () => dispatch(deauthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
