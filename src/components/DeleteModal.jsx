import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const DeleteModaL = ({ isOpen, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [errorMessage, setErrorMessage] = useState(""); // Ошибка от "сервера"

  if (!isOpen) return null;

  const handleDelete = () => {
    setIsLoading(true);
    setErrorMessage("");

    // Имитация запроса к серверу
    setTimeout(() => {
      //   const success = Math.random() > 0.5; // 50% успеха для примера
      const success = true;

      if (success) {
        onConfirm(); // Удаление данных
        setIsLoading(false);
        onClose(); // Закрытие модального окна
      } else {
        setErrorMessage("Ошибка на сервере. Попробуйте снова.");
        setIsLoading(false);
      }
    }, 2000); // 2 секунды задержки
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Подтвердите свое действие
        </h2>

        <div>
          Вы действительно хотите удалить данные о компании?
          <span>
            Это действие <b>нельзя</b> будет отменить.
          </span>
        </div>

        {errorMessage && (
          <p className="text-red-500 mt-4 text-sm">{errorMessage}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`px-4 py-2 text-gray-600 hover:text-gray-800 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Отмена
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Удаление..." : "Удалить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModaL;
