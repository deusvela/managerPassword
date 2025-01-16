import { useState, useEffect } from "react";
import Listing from "./components/Listing";
import UploadPassButton from "./components/UploadPassButton";
import { Search } from "lucide-react";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  // Загрузка данных из localStorage при первой загрузке
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("passwords")) || [];
    setData(savedData);
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.companyName.toLowerCase().includes(query.toLowerCase())
    );

    const debounceTimer = setTimeout(() => {
      setFilteredData(filtered);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, data]);

  const handleAddData = async (newEntry) => {
    try {
      const newEntryWithId = { ...newEntry, id: new Date().getTime() };
      const updatedData = [...data, newEntryWithId];
      setData(updatedData);
      localStorage.setItem("passwords", JSON.stringify(updatedData));
      alert("Пароль успешно добавлен!");
    } catch {
      alert("Ошибка при добавлении пароля! Попробуйте снова.");
    }
  };

  return (
    <>
      <header>
        <div className="flex flex-col md:flex-row justify-around bg-slate-900 m-0 h-[350px] py-auto px-5">
          <div className="flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl text-center">Менеджер паролей</h1>
            <p className="text-xl pt-4">
              Работу выполнил Денис Прилуков | Deusvela
            </p>
          </div>
          <img
            src="https://www.dreamhost.com/blog/wp-content/smush-webp/2024/04/1460-x-1095-BLOG-HERO-_-Beginner_s-Guide-to-Tailwind-CSS-730x548.jpg.webp"
            alt="Картинка"
            className="py-2 rounded-lg"
          />
        </div>
      </header>
      <main>
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="flex max-w-4xl mx-auto items-center gap-x-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск компаний..."
                className="w-full px-2 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-shrink-0">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <UploadPassButton onSubmit={handleAddData} />
          </div>
          <Listing data={filteredData} setData={setData} />
        </div>
      </main>
      <footer>
        <div className="bg-slate-900 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-row md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-2xl text-center md:text-left">
                  Менеджер паролей
                </h1>
                <p className="text-lg pt-4">Денис Прилуков | Deusvela</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end space-y-2">
                <a
                  href="https://github.com/deusvela"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://t.me/deusvela"
                  className="text-blue-400 hover:underline"
                >
                  Telegram
                </a>
                <a
                  href="https://vk.com/d.prilukov"
                  className="text-blue-400 hover:underline"
                >
                  Vkontakte
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
