import { BrowserRouter, Routes, Route } from 'react-router'; 
import Home from './Home';
import Dashboard from './Dashboard';
import Navigation from './Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
