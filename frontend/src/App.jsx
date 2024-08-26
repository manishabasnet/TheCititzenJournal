import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Signup from './Pages/SignUp';

const App = () =>{
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
    );
  }

export default App
