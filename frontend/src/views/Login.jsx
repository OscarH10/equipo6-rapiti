// src/views/Login.jsx
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Iniciar Sesión</h1>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-2">Email</label>
            <input 
              type="email" id="email" name="email" 
              className="p-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
              placeholder="tu@correo.com"
              required 
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-gray-600 mb-2">Contraseña</label>
            <input 
              type="password" id="password" name="password" 
              className="p-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transform transition-transform active:scale-95 focus:ring-offset-2 focus:ring-2 focus:ring-black"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;