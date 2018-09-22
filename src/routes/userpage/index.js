import { connect } from 'preact-redux'
import { Button } from 'preact-fluid'
import { loggedInAs, loggedOut } from '../../actions/'

const Userpage = ({ id, name, logged_in, login, logout }) =>
    <div>
        <h1>Userpage</h1>
        { logged_in && <p>Logged in as user: {name} ({id})</p> }
        <div>
            <Button onClick={() => login({name: "james", id: 2})}>Login as James</Button>
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    </div>


const mapStateToProps = (userdata) => ({ ...userdata.user })
const mapDispatchToProps = (dispatch) =>
({
    login: user => dispatch(loggedInAs(user)),
    logout: () => dispatch(loggedOut())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Userpage);
