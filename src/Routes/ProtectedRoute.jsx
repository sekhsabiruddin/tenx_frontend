// src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { checkAuth } from "../redux/reducer/auth";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error loading user:", error);
      });
  }, [dispatch]);

  if (isLoading || status === "loading") {
    // Return a loading indicator if authentication state is loading
    return <Loading />;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
