import { Container , Row, Col} from 'react-bootstrap'

import React from 'react'

function Footer() {
    
    const currentYear = new Date().getFullYear();
    return (
        // show footer (my name and &copy this year)
            <footer>
                <Container>
                    <Row>
                        <Col className='text-center py-3'>
                            <p> youcef &copy; {currentYear}</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
}

export default Footer