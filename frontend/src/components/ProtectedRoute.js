import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn }) => {
    if (loggedIn){
      return children;
    }
  
    return <Redirect to="/signin" />
  }

export default ProtectedRoute;