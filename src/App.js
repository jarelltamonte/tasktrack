import { BrowserRouter, Routes, Route } from 'react-router'; 
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes> {/* Routes must directly wrap the Route components */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
