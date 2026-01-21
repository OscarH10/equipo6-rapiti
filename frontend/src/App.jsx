import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Login from "./views/Login";
import Buscador from "./views/Buscador";
import Navbar from "./components/Nabvar"; 
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buscador" element={<Buscador />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;