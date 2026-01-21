import { useState } from 'react';

const Buscador = () => {
  const [query, setQuery] = useState('');
  const [items] = useState(['React', 'Vite', 'Tailwind CSS', 'Accesibilidad', 'JavaScript']);

  const filtrados = items.filter(i => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Buscador</h1>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-black">
            Buscar
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {filtrados.map((item, idx) => (
            <li 
              key={idx} 
              tabIndex="0" 
              className="py-3 px-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none rounded-md transition-colors cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Buscador;