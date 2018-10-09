import { Component } from 'preact'
import { connect } from 'preact-redux'
import { Grid, Cell, Card, CardHeader, CardBody, CardFooter, Button } from 'preact-fluid'
import { route } from 'preact-router'

import { getAllCategories, getAllThreads } from '../actions/content.js'

class Dashboard extends Component {
  componentWillMount () {
    this.props.getData()
  }

  render ({ categories, threads, pending, mobile }) {
    return <Grid style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
      <Cell width={12} middle>
        <h1>Dashboard</h1>
      </Cell>
      <Cell width={12} middle>
        <h3>Categories</h3>
      </Cell>
      { pending > 0 && <p>Loading...</p> }
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
                    <Card>
                      <CardHeader title={thread.title} />
                      <CardBody>{thread.description}</CardBody>
                      <CardFooter right={
                        <Button onClick={_ => route(`/thread/${thread.id}`)}>See comments</Button>
                      } />
                    </Card>
                  </Cell>
                )
            }
          </Cell>
        )
      }
    </Grid>
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  getData: _ => {
    dispatch(getAllCategories())
    dispatch(getAllThreads())
  }
})

const mapStateToProps = ({ content, media }) => ({
  pending: content.pending,
  categories: content.categories,
  threads: content.threads,
  mobile: media.mobile
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
