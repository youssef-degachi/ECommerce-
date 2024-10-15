import React from 'react'
import { Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from '../components/Product'

import Loading from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import { useGetProductsQuery } from '../slices/productsApiSlice'









function HomeScreen() {


    // useParams to read number and keyword from url
    const { pageNumber, keyword } = useParams();

    // get product from db 
    const { data, isLoading,error} = useGetProductsQuery({keyword, pageNumber});

    return (
        <>
        { keyword && <Link to='/' className='btn btn-light'> Go Back</Link>}
        { isLoading ?(
            <Loading></Loading>
        ) 
        :error? (
            <div>
                <Message variant="danger" message={error?.data?.message}></Message>
            </div>
        ) 
        :(
            <>
            <h1>Latest Products</h1>
            <Row>
                {data.products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} /> 
                    </Col>
                ))}
            </Row>
            <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
            />
            </>
        )}
    </>
    )
}

export default HomeScreen