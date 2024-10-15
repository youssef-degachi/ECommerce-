
import { useParams} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  usePaidOrderMutation,
  useNotDeliverOrderMutation,
  useNotPaidOrderMutation,

} from '../slices/ordersApiSlices';
import { useSelector } from 'react-redux';



const OrderScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {id:orderId} = useParams()
  const { data: order,refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);




  //deliver
  const [deliverOrder , {isLoading: loadingDeliver}] = useDeliverOrderMutation();
  const [notDeliverOrder , {isLoading: loadingNotDeliver}] = useNotDeliverOrderMutation();

    // change delivery order state using refetch for F5
    const deliverHandler = async () => {
      await deliverOrder(orderId);
      refetch();
    };
    const notDeliverHandler = async () => {
      await notDeliverOrder(orderId);
      refetch();
    };





  // paid
  const [paidOrder , {isLoading: loadingPaid}] = usePaidOrderMutation();
  const [notPaidOrder , {isLoading: loadingNotPaid}] = useNotPaidOrderMutation();

  // change paid order state using refetch for F5
  const paidHandler = async () => {
    await paidOrder(orderId);
    refetch();
  };
  const notPaidHandler = async () => {
    await notPaidOrder(orderId);
    refetch();
  };


  return isLoading ? <Loader/> : error ? (<Message variant='danger' />) 
      :(<>
      
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h1>Order state</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                <h3>Order Id: {order._id}</h3>
                </ListGroup.Item>
            <ListGroup.Item>

              {order.isDelivered? (
                <>
              


                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                    </>
              ):(
                <Message variant='danger'>
                  Not Delivered
                </Message>
              )
            }
            </ListGroup.Item>

            <ListGroup.Item>
            {order.isPaid ? (
            <Message variant='success'>
              Paid on {order.paidAt}
            </Message>
            )
            :(
              <Message variant='danger'>
                Not Paid
              </Message>
            )
            }
            </ListGroup.Item>



            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item,index) =>(
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
            </ListGroup.Item>
            
            
            
            
            
            </ListGroup>
          </Col>
        
        <Col md={4}>
          <ListGroup variant='flush'>
          <ListGroup.Item>
            <h1>Order Summary</h1>
          </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items Price: </Col>
                <Col>{order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping: </Col>
                <Col>{order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax: </Col>
                <Col>{order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total: </Col>
                <Col>{order.totalPrice}</Col>
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
                {order.paymentMethod}
                <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},
                {order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              </ListGroup.Item>
              <ListGroup.Item>

                <h2>User Detail</h2>
                <p>
                  <strong>Name: </strong> {order.user.name} <br />
                  <strong>Email: </strong> {order.user.email}
                </p>


              </ListGroup.Item>


              {loadingDeliver && <Loader />}
              {loadingNotDeliver && <Loader />}
              
              
              {/**
                  //todo: test if user is admin 
                  if admin show change order status buttons
               */}
              {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered ?(
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )
                  :userInfo &&
                  userInfo.isAdmin &&
                  order.isDelivered ?(
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={notDeliverHandler}
                      >
                        Mark Not Delivered
                      </Button>
                    </ListGroup.Item>
                  ):(
                    <></>
                  )
                
                }

                {loadingPaid && <Loader />}
                {loadingNotPaid && <Loader />}


                {userInfo &&
                userInfo.isAdmin &&
                !order.isPaid ? (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={paidHandler}
                    >
                      Mark As Paid
                    </Button>
                  </ListGroup.Item>
                )
                :userInfo &&
                userInfo.isAdmin &&
                order.isPaid ?(
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={notPaidHandler}
                    >
                      Mark Not Paid
                    </Button>
                  </ListGroup.Item>
                ):(
                  <>
                  </>
                )
                }
          </ListGroup>
        </Col>
        </Row>

      </>)
  
}

export default OrderScreen