import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react'
// test if user is admin
const AdminRoute = () => {
  // get user info
  const { userInfo } = useSelector((state) => state.auth);
  // return if user is admin or not
  return userInfo && userInfo.isAdmin ?( <Outlet />) // return if user is admin
  : (<Navigate to='/login' replace />); // go to login page if not admin
}

export default AdminRoute