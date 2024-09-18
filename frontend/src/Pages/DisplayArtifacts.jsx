import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArtifactPost from '../Components/ArtifactPost';
import styles from "./DisplayArtifacts.module.css"

function DisplayArtifacts() {
    const [artifacts, setArtifacts] = useState([]);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:8000/api/artifacts', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            setArtifacts(response.data);
            console.log(response.data);
        })
        .catch(err => {
            if (err.response && err.response.status === 403) {
                setError('Forbidden: You do not have permission to view this resource.');
            } else {
                setError('An error occurred while fetching artifacts.');
            }
        });
    }, [token, navigate]);

    return (
        <div className={styles.artifactDescription}>
            {error && <p>{error}</p>}
            {artifacts.length === 0 && !error && <p>Loading artifacts...</p>}
            {artifacts.map((artifact) => (
                <ArtifactPost key={artifact._id} artifact={artifact}>
                    {artifact.title}
                </ArtifactPost>
            ))}
        </div>
    );
}

export default DisplayArtifacts;
