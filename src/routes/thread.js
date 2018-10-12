import { Component } from 'preact'
import { connect } from 'preact-redux'
import { Grid, Cell, Button } from 'preact-fluid'
import { route } from 'preact-router'
import linkState from 'linkstate'

import InfoCard from '../components/InfoCard.js'
import { getCommentsInThread, getThread, getUser, addComment, acceptError } from '../actions/content.js'

class Thread extends Component {
  render = (
    { isAuth, addComment, thread, comments, idError, error, mobile, acceptError },
    { content }
  ) => <Grid columns={mobile ? 5 : 12} style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
    { thread &&
    <Cell width={mobile ? 5 : 12} middle>
      <h1>{thread.title}</h1>
      <p>{thread.description}</p>
    </Cell>
    }
    { idError &&
      <Cell left={mobile ? 1 : 4} width={5}>
        <InfoCard
          type='error'
          message={idError}
          label='Dashboard'
          action={_ => route('/dashboard')}
        />
      </Cell>
    }
    { error &&
      <Cell left={mobile ? 1 : 4} width={5}>
        <InfoCard
          type='error'
          message={error}
          label='Ok'
          action={acceptError}
        />
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
    { thread && <Cell left={mobile ? 1 : 4} width={5}>
      <textarea
        rows={4}
        value={content}
        onChange={linkState(this, 'content')} />

      <Button onClick={_ => addComment(content)}>Add comment</Button>
    </Cell>
    }
  </Grid>
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
      idError: `'${props.id}' is an invalid id (should be a number)`,
      thread: null,
      comments: []
    }
  } else {
    return {
      ...common,
      error: content.error,
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
      addComment: content => dispatch(addComment({ thread_id: propsId, content })),
      acceptError: _ => dispatch(acceptError())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread)
