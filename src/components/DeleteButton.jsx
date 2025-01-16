import React, { useState } from "react";
import DeleteModaL from "./DeleteModal";

const DeleteButton = ({ onDelete, companyName, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg font-medium transition-all text-white"
        title="Добавить пароль"
      >
        <span>Удалить</span>
      </button>

      <DeleteModaL
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => onDelete(id, companyName)}
        companyName={companyName}
      />
    </>
  );
};
export default DeleteButton;
