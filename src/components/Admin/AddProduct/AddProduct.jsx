import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "../Modal/Modal";

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddQuestion = () => {
    // Handle the logic to add a question here
    closeModal();
  };

  return (
    <>
      <div className="m-5">
        <div className="flex justify-center">
          <div className="w-[80%] flex items-center justify-end">
            <button
              className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={openModal}
            >
              <span className="mr-2 text-[1.3rem]">Add</span>
              <CiCirclePlus size={30} />
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} />}
      </div>
    </>
  );
};

export default AddProduct;
