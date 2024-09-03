import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Signup from './Pages/SignUp';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Artifacts from './Pages/DisplayArtifacts';
import AddArtifact from './Pages/AddArtifact';
import ProtectedRoute from './Pages/ProtectedRoute';
import DisplayArtifacts from './Pages/DisplayArtifacts';

const App = () =>{
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/artifacts" element={<ProtectedRoute><DisplayArtifacts /></ProtectedRoute>} />
          <Route path="/addartifact" element={<ProtectedRoute><AddArtifact /></ProtectedRoute>} />
        </Routes>
    </Router>
    );
  }

export default App
