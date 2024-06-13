import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Page/LoginPage";
import SignupPage from "./Page/SingupPage";
import Admin from "./components/Admin/admin";
import Home from "./components/Home/Home";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ProtectedAdminRoute from "./Routes/ProtectedAdmin";
import ProductDetails from "./components/ProductDetails/ProductDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/product/:id" component={ProductDetails} /> */}
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="/sign-up" element={<SignupPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      ></Route>
      {/* Add more routes here as needed */}
    </Routes>
  );
}

export default App;
