import { AppBar, Button } from 'preact-fluid'

export default ({ f }) =>
  <AppBar
    primary
    title='bitspleaseee forum'
    titleStyle={{ 'font-size': '30px', 'font-variant': 'small-caps', 'color': 'white' }}
    rightSection={
      <Button secondary onClick={_ => f()}>Logout</Button>
    }
  />
