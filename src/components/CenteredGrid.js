import { Grid, Cell } from 'preact-fluid'

export default ({ children, ...props }) =>
  <Grid {...props} columns={'1fr'} style={{ 'max-width': '900px', 'margin': '0 auto', 'padding': '10px' }}>
    {
      children.map(child => <Cell middle>{child}</Cell>)
    }
  </Grid>
