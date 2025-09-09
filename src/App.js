import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from './pages/index'

function App() {
  return (
    <Router basename="/portfolio">
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
