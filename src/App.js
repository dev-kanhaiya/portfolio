import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './pages/index'
import Demo from './pages/demo'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}

export default App;
