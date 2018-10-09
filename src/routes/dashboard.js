import { Component } from 'preact'
import { connect } from 'preact-redux'
import { Grid, Cell, Card, CardHeader, CardBody } from 'preact-fluid'

import { getAllCategories, getAllThreads } from '../actions/content.js'

class Dashboard extends Component {
  componentWillMount () {
    this.props.getAllCategories()
    this.props.getAllThreads()
  }

  render ({ categories, threads, mobile }) {
    return <Grid style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
      <Cell width={12} middle>
        <h1>Dashboard</h1>
      </Cell>
      <Cell width={12} middle>
        <h3>Categories</h3>
      </Cell>
      {
        categories && categories.slice(0, 6).map(({ title, description }) =>
          <Cell width={(mobile && 12) || 4}>
            <Card>
              <CardHeader title={title} />
              <CardBody>{description}</CardBody>
            </Card>
          </Cell>
        )
      }
    </Grid>
  }
}

const mapDispatchToProps = dispatch => ({
  getAllCategories: _ => dispatch(getAllCategories()),
  getAllThreads: _ => dispatch(getAllThreads())
})

const mapStateToProps = state => ({
  ...state.content,
  mobile: state.media.mobile
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
