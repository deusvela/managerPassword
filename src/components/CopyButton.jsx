import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

const CopyButton = ({ password }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyPassword = (password, setIsCopied) => {
    navigator.clipboard.writeText(password); // Копируем пароль в буфер обмена
    setIsCopied(true); // Устанавливаем состояние "Скопировано"
    setTimeout(() => setIsCopied(false), 3000); // Возвращаем кнопке активное состояние через 3 секунды
  };

  return (
    <button
      onClick={() => handleCopyPassword(password, setIsCopied)}
      disabled={isCopied}
      className={`flex items-center px-4 py-1 rounded-lg font-medium transition-all ${
        isCopied
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700 text-white"
      }`}
      title="Копировать"
    >
      {isCopied ? (
        <>
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Скопировано
        </>
      ) : (
        <>
          <Clipboard className="h-4 w-4 mr-2" />
          Копировать
        </>
      )}
    </button>
  );
};

export default CopyButton;
