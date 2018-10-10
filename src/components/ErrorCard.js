
import { Card, CardHeader, CardBody } from 'preact-fluid'

export default ({ message }) =>
  <Card style={{ 'background-color': '#FF1100', 'color': '#212121' }}>
    <CardHeader
      title='Error' />
    <CardBody>{message}</CardBody>
  </Card>
