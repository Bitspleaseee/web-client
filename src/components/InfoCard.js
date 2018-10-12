import { Card, CardHeader, CardBody, CardFooter, Button } from 'preact-fluid'

const types = {
  'error': { 'title': 'An error occurred', 'style': { 'background-color': '#f44336', 'color': '#B0BEC5' } },
  'warn': { 'title': 'Warning', 'style': { 'background-color': '#FF9800', 'color': '#B0BEC5' } },
  'success': { 'title': 'Success', 'style': { 'background-color': '#4CAF50', 'color': '#B0BEC5' } }
}

export default ({ type, message, action, label }) =>
  <Card style={types[type].style}>
    <CardHeader
      title={types[type].title} />
    <CardBody>{message}</CardBody>
    { action &&
    <CardFooter
      right={
        <Button onClick={action}>{label}</Button>
      }
    />
    }
  </Card>
