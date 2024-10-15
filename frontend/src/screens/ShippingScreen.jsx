import {useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress} from '../slices/cartSlice'

function ShippingScreen() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress }= cart

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <h1>shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Address</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label>City</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label>Postal Code</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter postalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label>Country</Form.Label>

          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <Button type="submit" variant='danger' className='my-2'>
            Continue
          </Button>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen