import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Signup from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';

const App = () =>{
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </Router>
    );
  }

export default App
