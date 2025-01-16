import React, { useState } from "react";
import { X } from "lucide-react";

const UploadPassModal = ({ isOpen, onClose, onSubmit }) => {
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState(12);
  const [useLetters, setUseLetters] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useMixedCase, setUseMixedCase] = useState(false);
  const [useCustomSet, setUseCustomSet] = useState(false);
  const [customSet, setCustomSet] = useState("");
  const [isManualInput, setIsManualInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsManualInput(value.length > 0); // Если поле не пустое, считаем ввод ручным
  };

  const generatePassword = () => {
    if (isManualInput) return; // Генерация блокируется, если пароль вводится вручную

    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    let charset = "";

    if (useCustomSet && customSet) {
      charset = customSet;
    } else {
      if (useLetters) charset += letters;
      if (useNumbers) charset += numbers;
      if (useSymbols) charset += symbols;
      if (useMixedCase) charset += letters.toUpperCase();
    }

    if (!charset) return "";

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const handleSubmit = () => {
    // Проверяем обязательные поля
    if (!companyName.trim() || !password.trim()) {
      setErrorMessage("Название компании и пароль обязательны для заполнения!");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    setTimeout(() => {
      // const success = Math.random() > 0.5; // 50% успеха
      const success = true;
      if (success) {
        const newData = { companyName, password };
        onSubmit(newData); // Передаем данные через `onSubmit`
        setCompanyName(""); // Очистка полей после успешной отправки
        setPassword("");
        setIsLoading(false);
        setIsManualInput(false);
        onClose();
      } else {
        setErrorMessage("Ошибка отправки данных на сервер. Попробуйте снова.");
        setIsLoading(false);
      }
    }, 500); // Задержка в 2 секунды
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Добавить пароль</h2>

        {errorMessage && (
          <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>
        )}

        <input
          type="text"
          placeholder="Введите компанию"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className={`focus:ring-blue-500 w-full mb-3 px-3 py-2 rounded-lg ${
            companyName ? "border-red-300" : "border"
          }`}
          required
        />
        <input
          type="text"
          placeholder="Введите пароль или сгенерируйте"
          value={password}
          onChange={handlePasswordChange}
          className="focus:ring-blue-500 w-full mb-3 px-3 py-2 border rounded-lg"
          required
        />

        <div className="mb-4">
          <label className="block mb-2">Длина пароля:</label>
          <input
            type="number"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            min="4"
            max="32"
            disabled={isManualInput} // отключаю, если пароль вводится вручную
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4 space-y-2">
          <div>
            <input
              type="checkbox"
              checked={useLetters}
              onChange={() => setUseLetters(!useLetters)}
              disabled={isManualInput || useCustomSet}
              id="letters"
            />
            <label htmlFor="letters" className="ml-2">
              Использовать буквы
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
              disabled={isManualInput || useCustomSet}
              id="number"
            />
            <label htmlFor="number" className="ml-2">
              Использовать цифры
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
              disabled={isManualInput || useCustomSet}
              id="symbol"
            />
            <label htmlFor="symbol" className="ml-2">
              Использовать спецсимволы
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={useMixedCase}
              onChange={() => setUseMixedCase(!useMixedCase)}
              disabled={isManualInput || useCustomSet}
              id="register"
            />
            <label htmlFor="register" className="ml-2">
              Смешанный регистр
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={useCustomSet}
              onChange={() => setUseCustomSet(!useCustomSet)}
              disabled={isManualInput}
              id="custom"
            />
            <label htmlFor="custom" className="ml-2">
              Использовать собственный набор символов
            </label>
          </div>
          {useCustomSet && (
            <input
              type="text"
              placeholder="Введите набор символов"
              value={customSet}
              onChange={(e) => setCustomSet(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mt-2"
              disabled={isManualInput}
            />
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Отмена
          </button>
          <button
            onClick={generatePassword}
            disabled={isManualInput} // блокирую генерацию, если вводится вручную
            className={`px-4 py-2 ${
              isManualInput
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-purple-500 text-white hover:bg-purple-600"
            } rounded-lg`}
          >
            Сгенерировать
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPassModal;
