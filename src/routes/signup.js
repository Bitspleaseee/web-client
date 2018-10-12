import { Component } from 'preact'
import { connect } from 'preact-redux'
import { route } from 'preact-router'
import linkState from 'linkstate'

import { deauthenticate, registerUser, acceptError } from '../actions/auth.js'
import InfoCard from '../components/InfoCard.js'
import Form from '../components/Form.js'
import CenteredGrid from '../components/CenteredGrid.js'

class Signup extends Component {
  render = (
    { userRegistered, pending, error, registerUser, deauthenticate, acceptError },
    { username, password, email }
  ) => <CenteredGrid>
    <h1>Signup</h1>
    { error &&
    <InfoCard
      type='error'
      message={error}
      label='Ok'
      action={acceptError}
    />
    }
    { userRegistered &&
    <InfoCard
      type='success'
      message={'A user was succesfully registered'}
      label='Go to login'
      action={_ => route('/login')}
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
          label: 'Email',
          type: 'email',
          value: email,
          onChange: linkState(this, 'email')
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
          label: 'Signup',
          loading: pending,
          primary: true,
          onClick: _ => registerUser({ username, email, password })
        },
        {
          label: 'Already have an account?',
          loading: false,
          onClick: _ => route('/login')
        }
      ]} />
  </CenteredGrid>
}

const mapStateToProps = ({ auth }) => ({
  error: auth.error,
  pending: auth.pending,
  userRegistered: auth.registered
})

const mapDispatchToProps = dispatch => ({
  registerUser: (data) => dispatch(registerUser(data)),
  deauthenticate: () => dispatch(deauthenticate()),
  acceptError: () => dispatch(acceptError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
