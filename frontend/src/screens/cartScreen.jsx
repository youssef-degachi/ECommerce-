import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // test if user put qty more then max quantity
  const testMaxQty = (product) => {
    if (product.qty > product.countInStock) {
        alert("Entered quantity exceeds available stock!");
        let  qty = product.countInStock
        dispatch(addToCart({ ...product, qty }));
    }
    if(product.qty === 0){
        window.confirm("are you sure you want to delete this item?") ?dispatch(removeFromCart(product._id)) : dispatch(addToCart({ ...product, qty:1 }));
      }
  }
  // add to cart function
  const addToCartHandler = (product, qty) => {
      dispatch(addToCart({ ...product, qty }));
  };
  // remove from cart function  
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const { userInfo } = useSelector((state) => state.auth);
  const checkoutHandler = () => {
    if (userInfo){
      navigate('/shipping');
    }else{
      navigate('/login?redirect=/shipping');
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {/*  loop about item  */}
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>

                    {/* user input qty and test maxQty */}
                    <input    
                        type="number"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        min="1" 
                        max={item.countInStock} 
                        style={{ borderRadius: '10px' }}
                        onBlur={(e) => testMaxQty(item)} 
                    />
                    <br />
                    max:{item.countInStock}
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
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
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                variant='danger'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
