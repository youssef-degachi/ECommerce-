import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar , Nav , Container,Badge, NavDropdown} from 'react-bootstrap'
import { FaShoppingCart , FaUser} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap' // => npm i react-router-bootsrap
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux'

import SearchBox from './SearchBox';

import logo from "../assets/Y.png"
export default function Header() {
    // Access the cart state from the Redux store
    const { cartItems } = useSelector((state) => state.cart);
    // Access the auth state from the Redux store
    const { userInfo } = useSelector((state) => state.auth);
    // Access the dispatch function from the React Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //call lougout api method
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () =>{
        try{
            // Call the logout API method
            await logoutApiCall().unwrap(); // unwrap(); to read and handle errors
            dispatch(logout()); // remove auth cart from redux store
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <header>
            <Navbar bg="danger" variant="danger" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="#home">
                            <img src={logo} alt="proshop" className="logo" />
                            YoucefShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <SearchBox id="search "/>
                            <LinkContainer to="/cart">

                                {/* cart count  */}
                                <Nav.Link ><FaShoppingCart/> Cart
                                {
                                    cartItems.length > 0 &&(
                                        <Badge pill bg="success" style={{marginLeft: '5px'}}>
                                            {cartItems.reduce((a,c)=>a+c.qty, 0) }
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                            </LinkContainer>
                            {/* navbar for user */}
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    {/* <LinkContainer to="/logout"> */}
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    {/* </LinkContainer> */}
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href="/login" ><FaUser/> Sign In</Nav.Link>
                                </LinkContainer>
                            ) }

                            {/* navbar for admin  */}
                            
                            { userInfo && userInfo.isAdmin ? (
                                <NavDropdown title='Management' >
                                    {/* call all component */}
                                    <LinkContainer to="/admin/orderlist/">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist/">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist/">
                                        <NavDropdown.Item>Product</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                                ):(<></>)
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
