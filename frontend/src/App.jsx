import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Staff from './pages/Staff';
import Programs from './pages/Programs';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
