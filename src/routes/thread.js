import { Component } from 'preact'
import { connect } from 'preact-redux'
import { Grid, Cell, Button } from 'preact-fluid'
import { route } from 'preact-router'
import linkState from 'linkstate'

import WarningCard from '../components/WarningCard.js'
import { getCommentsInThread, getThread, getUser, addComment } from '../actions/content.js'

class Thread extends Component {
  state = {
    content: ''
  }

  componentWillMount () {
    this.props.fetchData()
  }

  render ({ isAuth, addComment, thread, comments, users, error, mobile }, { content }) {
    return <Grid columns={mobile ? 5 : 12} style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
      { error &&
      <Cell left={mobile ? 1 : 4} width={5}>
        <WarningCard
          message={error}
          label='Dashboard'
          onClick={_ => route('/dashboard')}
        />
      </Cell> }
      { thread &&
        <Cell width={mobile ? 5 : 12} middle>
          <h1>{thread.title}</h1>
          <p>{thread.description}</p>
        </Cell>
      }
      {
        comments.map(({ content, user }) =>
          <Cell left={mobile ? 1 : 4} width={5}>
            <p>{content}</p>
            <p><small>{user.username}</small></p>
          </Cell>
        )
      }
      { isAuth &&
      <Cell left={mobile ? 1 : 4} width={5}>
        <textarea
          rows={4}
          cols={50}
          value={content}
          onChange={linkState(this, 'content')} />

        <Button onClick={_ => addComment(content)}>Add comment</Button>
      </Cell>
      }
    </Grid>
  }
}

const mapStateToProps = ({ auth, content, media }, props) => {
  const propsId = parseInt(props.id)
  const common = {
    authUser: auth.username,
    isAuth: auth.authenticated,
    mobile: media.mobile
  }
  if (isNaN(propsId)) {
    return {
      ...common,
      error: `'${props.id}' is an invalid id (should be a number)`,
      thread: null,
      comments: []
    }
  } else {
    return {
      ...common,
      thread: content.threads.find(({ id }) => id === propsId),
      comments: content.comments
        .filter(({ thread_id }) => thread_id === propsId)
        .map(comment => ({
          ...comment,
          user: props.getUser(comment.user_id)
        })
        )
    }
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const propsId = parseInt(props.id)
  if (isNaN(propsId)) {
    return {
      fetchData: _ => {},
      getUser: _ => {},
      addComment: _ => {}
    }
  } else {
    return {
      fetchData: _ => {
        dispatch(getThread(propsId))
        dispatch(getCommentsInThread(propsId))
      },
      getUser: id => dispatch(getUser(id)),
      addComment: content => dispatch(addComment({ thread_id: propsId, content }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thread)
