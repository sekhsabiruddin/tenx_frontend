import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading/Loading";

import { Navigate } from "react-router-dom";

import { checkAdminAuth } from "../redux/reducer/admin";
const ProtectedAdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAdminAuthenticated, status } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAdminAuth())
      .unwrap() // Unwrap the promise result
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error loading admin authentication:", error);
      });
  }, [dispatch]);

  if (isLoading || status === "loading") {
    // Return a loading indicator if authentication state or admin status is loading
    return <Loading />;
  }

  if (!isAdminAuthenticated) {
    // Redirect to login or unauthorized page if not authenticated as admin
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated as admin
  return children;
};

export default ProtectedAdminRoute;
