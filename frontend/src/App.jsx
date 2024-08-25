import { useEffect, useState } from 'react'
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    // Make a GET request to the Django API
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
