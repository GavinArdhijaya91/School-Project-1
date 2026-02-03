import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import './index.css';

function App() {
  useEffect(() => {
    if (window.location.hash && window.location.hash !== '#beranda') {
      window.history.replaceState(null, null, window.location.pathname);
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
