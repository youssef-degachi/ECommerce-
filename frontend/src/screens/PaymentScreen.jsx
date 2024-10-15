import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  // read cart data from react redux
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  useEffect(() => {
    // test if user skip fill shipping address 
    if (!shippingAddress.address) {
      // go back to fill shipping address
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('delivery');

  const dispatch = useDispatch();
  //payment method
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
            className='my-2'
            type='radio'
            label='payment after delivery'
            id='delivery'
            name='paymentMethod'
            value='delivery'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='danger'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
