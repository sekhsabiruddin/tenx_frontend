import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/reducer/product";
import { format } from "date-fns";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  console.log("all the product", products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="m-5">
        <ToastContainer />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => {
            const discountPrice = product.price - product.discount;
            const formattedDate = format(
              new Date(product.createdAt),
              "dd MMM yyyy"
            );

            return (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="border p-4 rounded-lg shadow-md cursor-pointer">
                  <div className="w-full max-w-sm mx-auto">
                    {product.images.length > 0 ? (
                      <img
                        src={`${backend_url}${product.images[0]}`}
                        alt={product.productName}
                        className="w-full h-auto"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">{product.productName}</h2>

                    <div className="mt-2">
                      <span className="line-through text-gray-500">
                        ₹{product.price}
                      </span>
                      <span className="ml-2 text-lg font-bold text-red-600">
                        ₹{discountPrice}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Added on: {formattedDate}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
