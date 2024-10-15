import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { useState } from 'react';
import Rating from '../components/Rating'
import Loading from '../components/Loader';
import Message from '../components/Message'
import { useGetProductsDetailsQuery , useCreateReviewMutation } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import {useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'



const ProductScreen = () => {
    const { id:  productId } = useParams()
    const { userInfo} = useSelector((state)=> state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating , setRating ] = useState(0);
    const [comment, setComment] = useState('');

    
    const { data: product,refetch, isLoading,error } = useGetProductsDetailsQuery(productId);

    const [createReview,  { isLoading: loadingProductReview} ] = useCreateReviewMutation(); 

    // save review
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
            productId,
            rating,
            comment,
            }).unwrap();
            refetch();
            toast.success('Review created successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    
    // test if user put qty more than maxqty
    const testMaxQty = (e) => {
        if (qty > product.countInStock) {
            alert("Entered quantity exceeds available stock!");
            setQty(product.countInStock); // Reset quantity to maximum available stock
        }
    }
    // add item to cart
    const addToCartHandler = () => {
        dispatch(addToCart({...product ,qty}));
        navigate('/');
    }
    return (
        <>
        <Link className="btn btn-light my-3" to="/">go back</Link>

        {isLoading ? (
            <Loading/>

            
        ): error ? ( 
            <div>
                <Message variant="danger" message={error?.data?.message}></Message>
            </div>
        ):(
            <>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} className='imageProduct' fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{ product.name }</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item >Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item >Description: ${product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                        <strong>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of' }

                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            
                                            <Col> <h6>QTY</h6> </Col>
                                            <Col>
                                                {/* //! show max quantity using selected method
                                                <Form.Control  as="select" value = {qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                                >
                                                    
                                                    {[...Array(product.countInStock).keys()].map(
                                                        (x)=>( 
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Control> */}
                                                {/* //! show max quantity using input method*/}
                                                
                                                <input
                                                    type="number"
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}
                                                    min="1"
                                                    max={product.countInStock} 
                                                    style={{ borderRadius: '10px' }} 
                                                    onBlur={(e) => testMaxQty(e)}
                                                />
                                                max:{product.countInStock}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)
                                }
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            <Row className='review'>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <h3>No Reviews</h3>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                        <h2>Write a Customer Review</h2>

                        {loadingProductReview && <Loading />}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                            <Form.Group className='my-2' controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                as='select'
                                required
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2' controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                as='textarea' row='3' required value={comment} 
                                onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button
                                disabled={loadingProductReview}
                                type='submit'
                                variant='primary'
                            >
                                Submit
                            </Button>
                            </Form>
                        ) : (
                            <Message>
                            Please <Link to='/login'>sign in</Link> to write a review
                            </Message>
                        )}
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                </Row>
            </>

        )}

            
        </>
    )
}



export default ProductScreen