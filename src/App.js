import { BrowserRouter, Routes, Route } from 'react-router'; 
import Home from './Home';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes> {/* Routes must directly wrap the Route components */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
