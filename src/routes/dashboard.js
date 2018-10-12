import { Component } from 'preact'
import { connect } from 'preact-redux'
import { TextField, Grid, Cell, Card, CardHeader, CardBody, CardFooter, Button } from 'preact-fluid'
import { route } from 'preact-router'
import linkState from 'linkstate'

import { getAllCategories, getAllThreads, addThread } from '../actions/content.js'
import { deauthenticate } from '../actions/auth.js'
import MainBar from '../components//MainBar.js'

class Dashboard extends Component {
  render = (
    { deauthenticate, addThread, categories, threads, pending, mobile },
    { titles, descriptions }
  ) => <Grid>
    <Cell width={12}>
      <MainBar f={_ => { deauthenticate(); route('/login') }} />
    </Cell>
    { pending > 0 && <p>Laster innhold...</p> }
    {
      categories.slice(0, 6).map(category =>
        <Cell width={12}>
          <Cell width={12} middle>
            <h4>{category.title}</h4>
          </Cell>
          {
            threads.filter(({ category_id }) => category_id === category.id)
              .map(thread =>
                <Cell left={mobile ? 1 : 4} width={mobile ? 12 : 6}>
                  <Card style={{ 'margin': '10px' }}>
                    <CardHeader title={thread.title} />
                    <CardBody>{thread.description}</CardBody>
                    <CardFooter right={
                      <Button onClick={_ => route(`/thread/${thread.id}`)}>See comments</Button>
                    } />
                  </Card>
                </Cell>
              )
          }
          <Cell width={12} middle>
            <Card>
              <CardHeader title='Add a new thread to this category' />
              <CardBody>
                <TextField
                  placeholder='Title'
                  grid={{ columns: 1 }}
                  hideLabel
                  value={titles[category.id]}
                  onChange={linkState(this, 'titles[category.id]')} />
                <textarea
                  placeholder='Description'
                  style={{ resize: 'none', 'font-size': '14px', 'padding': '8px' }}
                  maxlength={255}
                  rows={8}
                  cols={30}
                  value={descriptions[category.id]}
                  onChange={linkState(this, 'descriptions[category.id]')} />
              </CardBody>
              <CardFooter right={
                <Button onClick={_ => addThread({ category_id: category.id, title: titles[category.id], description: descriptions[category.id] })} primary>Add new thread</Button>
              } />
            </Card>
          </Cell>
        </Cell>
      )
    }
  </Grid>
}

const mapStateToProps = ({ auth, content, media }) => ({
  pending: content.pending,
  categories: content.categories,
  threads: content.threads,
  mobile: media.mobile
})

const mapDispatchToProps = (dispatch, props) => ({
  getData: _ => {
    dispatch(getAllCategories())
    dispatch(getAllThreads())
  },
  deauthenticate: _ => dispatch(deauthenticate()),
  addThread: data => dispatch(addThread(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
