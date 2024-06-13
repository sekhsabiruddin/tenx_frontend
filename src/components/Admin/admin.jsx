import React from "react";
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminAllData from "./AdminAllData/AdminAllData";
import AddProduct from "./AddProduct/AddProduct";
const admin = () => {
  return (
    <div>
      <AdminHeader />
      <AddProduct />
      <AdminAllData />
    </div>
  );
};

export default admin;
