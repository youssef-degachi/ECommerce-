import React from 'react'
import { Container , Row , Col} from 'react-bootstrap'
const FormContainer = ({children}) => {
  return (
      // Return a Container component with a Row component as its child
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
export default FormContainer;