import React from "react";
import DeleteButton from "./DeleteButton.jsx";
import CopyButton from "./CopyButton.jsx";

const Listing = ({ data, setData }) => {
  const handleDelete = (id, companyName) => {
    // Удаление компании из localStorage
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Обновление состояния
    localStorage.setItem("passwords", JSON.stringify(updatedData)); // Сохранение в localStorage
  };

  return (
    <div className="mx-auto max-w-4xl mt-5 h-full rounded-md overflow-hidden shadow-lg relative">
      <ul className="flex flex-col gap-y-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-gray-700 font-medium">
                Компания: {item.companyName}
              </p>
              <p className="text-gray-500 text-sm">Пароль: {item.password}</p>
            </div>
            <div className="flex flex-shrink-0 gap-x-2">
              <CopyButton password={item.password} />
              <DeleteButton
                id={item.id}
                companyName={item.companyName}
                onDelete={handleDelete}
              />
            </div>
          </li>
        ))}
        {data.length === 0 && (
          <li className="text-center py-3 text-gray-500">Ничего не найдено</li>
        )}
      </ul>
    </div>
  );
};

export default Listing;
