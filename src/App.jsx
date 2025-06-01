import { Routes, Route } from 'react-router-dom';
import Profile from './Profile'; // Adjust path if needed
import Home from './Home'; // Or your main component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
