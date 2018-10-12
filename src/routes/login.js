import { Component } from 'preact'
import { connect } from 'preact-redux'
import { route } from 'preact-router'
import linkState from 'linkstate'

import { authenticate, deauthenticate, acceptError } from '../actions/auth.js'
import InfoCard from '../components/InfoCard.js'
import Form from '../components/Form.js'
import CenteredGrid from '../components/CenteredGrid.js'

class Login extends Component {
  render = (
    { error, pending, authenticate, isAuthenticated, deauthenticate, acceptError },
    { username, password }
  ) => <CenteredGrid>
    <h1>Login</h1>
    { error &&
    <InfoCard
      type='error'
      message={error}
      label='Ok'
      action={acceptError}
    />
    }
    { isAuthenticated &&
    <InfoCard
      type='success'
      message='You are logged in. Please continue to your dashboard by following the prompt'
      label='Go to dashboard'
      action={_ => route('/', false)
      }
    />
    }
    <Form
      inputs={[
        {
          label: 'Username',
          value: username,
          onChange: linkState(this, 'username')
        },
        {
          label: 'Password',
          type: 'password',
          value: password,
          onChange: linkState(this, 'password')
        }
      ]}
      actions={[
        {
          label: 'Login',
          loading: pending,
          primary: true,
          onClick: _ => authenticate({ username, password })
        },
        {
          label: 'Don\'t have an account?',
          onClick: _ => route('/signup')
        }
      ]} />
  </CenteredGrid>
}

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  pending: auth.pending,
  isAuthenticated: auth.authenticated
})

const mapDispatchToProps = dispatch => ({
  authenticate: (data) => dispatch(authenticate(data)),
  deauthenticate: () => dispatch(deauthenticate()),
  acceptError: () => dispatch(acceptError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
