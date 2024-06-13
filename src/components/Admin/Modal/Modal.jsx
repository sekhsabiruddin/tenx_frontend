import React, { useState } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { server } from "../../../server"; // Ensure the server URL is correctly imported
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../redux/reducer/product";
const Modal = ({ isOpen, closeModal }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("productDescription", productDescription);

    try {
      await dispatch(createProduct(formData));

      closeModal();
    } catch (error) {
      console.error("Error is", error);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

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
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images:
            </label>
            <div className="mt-2 flex items-center">
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload files</span>
                <input
                  type="file"
                  name="file" // Add a name attribute here if you plan to use it
                  id="upload"
                  accept=".jpg, .jpeg, .png"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="mt-2">
              {images.length > 0 && (
                <ul>
                  {images.map((image, index) => (
                    <li key={index}>{image.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[50%] group relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
