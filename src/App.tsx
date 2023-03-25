import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Api from './components/Api';
import Login from './components/Login';
import Register from './components/register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/store/:name" element={<Api/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
