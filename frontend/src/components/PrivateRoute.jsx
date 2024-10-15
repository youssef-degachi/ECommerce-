import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

//todo.. look at redux store




// test if user is admin or not
//! removed 

// const AdminRoute = () => {
  //   // get user info
  //   const { userInfo } = useSelector((state) => state.auth);
  //   // return if user is admin or not
  //   return userInfo && userInfo.isAdmin?( <Outlet />)//################################ 
  //   : (<Navigate to='/login' replace />);
  // }

// test if user is logged in or not
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
