import { Component } from 'preact'
import { LayoutGrid, TextField, Button } from 'preact-material-components'
import linkState from 'linkstate'
import { connect } from 'preact-redux'
import { route } from 'preact-router'

import { authenticate, deauthenticate } from '../actions/auth.js'
import WarningCard from '../components/WarningCard.js'

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  render (
    { isAuthenticated, loggedInAs, authenticate, deauthenticate },
    { username, password }
  ) {
    return <LayoutGrid>
      <LayoutGrid.Inner>
        <LayoutGrid.Cell desktopCols='12' tabletCols='8' phoneCols='4'>
          <h1>Login</h1>
        </LayoutGrid.Cell>
        { isAuthenticated &&
          <LayoutGrid.Cell desktopCols='3' tabletCols='1' /> }
        { isAuthenticated && <LayoutGrid.Cell cols='6'>
          <WarningCard
            message={`You are already logged in as ${loggedInAs}`}
            label='Logout'
            onClick={deauthenticate}
          />
        </LayoutGrid.Cell> }
        { isAuthenticated && <LayoutGrid.Cell desktopCols='3' tabletCols='1' /> }
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell cols='4'>
          <TextField
            fullwidth
            placeholder='Username'
            value={username}
            disabled={isAuthenticated}
            onInput={linkState(this, 'username')} />
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell cols='4'>
          <TextField
            fullwidth
            placeholder='Password'
            type='password'
            value={password}
            disabled={isAuthenticated}
            onInput={linkState(this, 'password')} />
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='2' tabletCols='2' phoneCols='2'>
          <Button
            raised
            disabled={isAuthenticated}
            onClick={_ => authenticate({ username, password })}>
            Login
          </Button>
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='2' tabletCols='2' phoneCols='2'>
          <Button
            outlined
            disabled={isAuthenticated}
            onClick={_ => route('/signup')}>
            Don't have an account?
          </Button>
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
      </LayoutGrid.Inner>
    </LayoutGrid>
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated,
  loggedInAs: auth.username
})

const mapDispatchToProps = dispatch => ({
  authenticate: (data) => dispatch(authenticate(data)),
  deauthenticate: () => dispatch(deauthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
