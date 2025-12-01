import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import HtGymApp from './HtGymApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* HT Gym project */}
        <Route path="/ht-gym" element={<HtGymApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;