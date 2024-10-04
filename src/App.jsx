import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fore from './Components/Fore.jsx';
import Header from './Components/Layouts/Header.jsx';
import Loader from './Components/Loader.jsx'; // Import the Loader component
import Footer from './Components/Layouts/Footer.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., API call or content loading)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay to simulate loading

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (loading) {
    return <Loader />; // Show the loader when loading is true
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Fore />} />
       
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
