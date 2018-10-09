import { Card, CardHeader, CardFooter, CardBody, Button } from 'preact-fluid'

export default ({ label, onClick, message }) =>
  <Card style={{ 'background-color': '#FF9800', 'color': '#212121' }}>
    <CardHeader
      title='Warning' />
    <CardBody>{message}</CardBody>
    <CardFooter
      right={<Button onClick={onClick}>{label}</Button>} />
  </Card>
