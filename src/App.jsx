import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KKList from "./pages/KKList";
import KKCreate from "./pages/KKCreate";
import KKEdit from "./pages/KKEdit"; 
import PendudukList from "./pages/PendudukList";
import PendudukCreate from "./pages/PendudukCreate";
import PendudukEdit from "./pages/PendudukEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kk" element={<KKList />} />
        <Route path="/kk/create" element={<KKCreate />} />
        <Route path="/kk/edit/:id" element={<KKEdit />} />
        <Route path="/penduduk" element={<PendudukList />} />
        <Route path="/penduduk/create" element={<PendudukCreate />} />
        <Route path="/penduduk/edit/:id" element={<PendudukEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
