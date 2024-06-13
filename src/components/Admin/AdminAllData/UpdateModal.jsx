import React, { useState, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/reducer/product";
import { toast } from "react-toastify";

const UpdateModal = ({ isOpen, closeModal, product }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setPrice(product.price || "");
      setDiscount(product.discount || "");
      setProductDescription(product.productDescription || "");
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      productName,
      price,
      discount,
      productDescription,
    };

    try {
      await dispatch(updateProduct({ productId: product._id, formData }));
      toast.success("Product updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-6 rounded-md shadow-md relative w-[60%] h-[90vh] overflow-auto">
        <div
          className="absolute right-1 top-1 text-2xl hover:text-blue-500 cursor-pointer"
          onClick={closeModal}
        >
          <IoIosCloseCircleOutline size={30} color="red" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name:
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="productName"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price:
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount:
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="discount"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <div className="mt-1">
              <textarea
                id="productDescription"
                name="productDescription"
                rows="4"
                required
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
