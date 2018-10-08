import { Card } from 'preact-material-components'

export default ({ label, onClick, message }) =>
  <Card style={{ 'background-color': '#FF9800', 'color': '#212121' }}>
    <div style={{ 'padding': '8px' }}>
      <h2 className='mdc-typography--title'>Warning</h2>
      <p className='mdc-typography--caption'>{message}</p>
    </div>
    <Card.Actions>
      <Card.ActionButton onClick={onClick}>{label}</Card.ActionButton>
    </Card.Actions>
  </Card>
