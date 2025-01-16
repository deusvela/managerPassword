import React, { useState } from "react";
import UploadPassModal from "./UploadPassModal";

const UploadPassButton = ({ onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white font-medium transition-all rounded-lg px-6 py-2 bg-purple-500 hover:bg-purple-600"
        title="Добавить пароль"
      >
        <span>Добавить компанию</span>
      </button>

      <UploadPassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          onSubmit(data); // Передаем данные в `App`
          setIsModalOpen(false); // Закрываем модальное окно
        }}
      />
    </>
  );
};

export default UploadPassButton;
