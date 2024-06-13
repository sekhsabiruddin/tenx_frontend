import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Header from "../Header/Header";
import { backend_url } from "../../server";
const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.items);
  const product = products.find((product) => product._id === id);

  if (!product) {
    return <div>Loading...</div>;
  }

  const {
    productName,
    price,
    discount,
    createdAt,
    productDescription,
    images,
  } = product;
  const discountPrice = price - discount; // Calculate discounted price
  const formattedDate = format(new Date(createdAt), "dd MMM yyyy"); // Format date

  return (
    <>
      <Header /> {/* Include your Header component if needed */}
      <div className="m-5">
        <div className="border p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full max-w-sm mx-auto">
              {images.length > 0 ? (
                <img
                  src={`${backend_url}${images[0]}`}
                  alt={productName}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{productName}</h2>
              <div className="mt-2">
                <span className="line-through text-gray-500">₹{price}</span>
                <span className="ml-2 text-lg font-bold text-red-600">
                  ₹{discountPrice}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Added on: {formattedDate}
              </p>
              <p className="mt-2">{productDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
