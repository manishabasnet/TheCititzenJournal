import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisplayArtifacts() {

    const [artifacts, setArtifacts] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        axios.get('http://localhost:8000/api/artifacts') 
          .then(response => {
            setArtifacts(response.data);
          })
          .catch(err => {
            setError(err.message);
          });
      }, []);

    return (
        <div>
            {
                artifacts.map((artifact) => (
                    <div key={artifact._id}>
                        {artifact.title}
                    </div>
                ))
            }
        </div>
    );
}

export default DisplayArtifacts;
