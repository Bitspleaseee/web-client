import { Component } from 'preact'
import { LayoutGrid, TextField, Button } from 'preact-material-components'
import linkState from 'linkstate'
import { connect } from 'preact-redux'
import { route } from 'preact-router'

import { deauthenticate, registerUser } from '../actions/auth.js'
import WarningCard from '../components//WarningCard.js'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  };

  render (
    { isAuthenticated, loggedInAs, deauthenticate, registerUser },
    { username, password, email }
  ) {
    return <LayoutGrid>
      <LayoutGrid.Inner>
        <LayoutGrid.Cell desktopCols='12' tabletCols='8' phoneCols='4'>
          <h1>Signup</h1>
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
            onInput={linkState(this, 'username')} />
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell cols='4'>
          <TextField
            fullwidth
            type='email'
            placeholder='Email'
            value={email}
            onInput={linkState(this, 'email')} />
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell cols='4'>
          <TextField
            fullwidth
            placeholder='Password'
            type='password'
            value={password}
            onInput={linkState(this, 'password')} />
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='4' tabletCols='2' />
        <LayoutGrid.Cell desktopCols='2' tabletCols='2' phoneCols='2'>
          <Button
            raised
            onClick={_ => registerUser({ username, password, email })}>
            Signup
          </Button>
        </LayoutGrid.Cell>
        <LayoutGrid.Cell desktopCols='2' tabletCols='2' phoneCols='2'>
          <Button
            outlined
            onClick={_ => route('/login')}>
            Already registered?
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
  registerUser: (data) => dispatch(registerUser(data)),
  deauthenticate: () => dispatch(deauthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
