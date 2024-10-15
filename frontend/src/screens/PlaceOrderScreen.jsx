import React from 'react';
import { Link , useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row , Col , ListGroup , Image, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Message from '../components/Message'
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlices';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(()=>{
    // test if the user skip shipping address and shipping methods
    if(!cart.shippingAddress.address){
      navigate('/shipping')
    }else if(!cart.paymentMethod){
      navigate('/payment')
    }
  },[cart.paymentMethod, cart.shippingAddress.address, navigate])
  

  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  // save order details in database
const placeOrderHandler = async () => {
  try {
    const res = await createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }).unwrap();
    dispatch(clearCartItems());
    alert("your order has been created")
    navigate(`/`);
  } catch (err) {
    toast.error(err);
  }
}

  return (
    <>
      <Row className="justify-content-center">
        <Col md={8}>
          
          <ListGroup variant='flush'>
            

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ?(
                <p>No items in cart</p>
              )
              : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <h3>{item.name}</h3>
                        </Col>
                        <Col>
                          <h3>{item.qty} * ${item.price} = ${item.price * item.qty}</h3>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>


          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Order Summary</h2>
          </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items Price: </Col>
                <Col>
                    {cart.itemsPrice}
                </Col>
              </Row>
              <Row>
                <Col>Shipping: </Col>
                <Col>
                    {cart.shippingPrice}
                </Col>
              </Row>
              <Row>
                <Col>Tax: </Col>
                <Col>
                    {cart.taxPrice}
                </Col>
              </Row>
              <Row>
                <Col>Total: </Col>
                <Col>
                    {cart.totalPrice}
                </Col>
              </Row>
            </ListGroup.Item>
              {error ? 
                ( <ListGroup.Item>
                    { error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>)
                : (<></>)
              }


              <ListGroup.Item>
                <h2>Payment Detail</h2>
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
                <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address},
                {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
              </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                variant='danger'
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
              { isLoading && <Loader />}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen