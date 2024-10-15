import { Spinner } from 'react-bootstrap';
// if element is loaded this function will show loading spinner
const loading = () => {
    return (
        <Spinner animation="border" role="status"
        style={
            {
                width: '5rem',
                height: '5rem',
                display: 'block',
                margin: 'auto',
            }
        }
        >
        </Spinner>
    )
}
export default loading