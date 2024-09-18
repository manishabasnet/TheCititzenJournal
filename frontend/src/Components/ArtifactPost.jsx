import React, { useState } from 'react';
import styles from "./ArtifactPost.module.css";

const ArtifactPost = ({ artifact }) => {

    const [showAllImages, setShowAllImages] = useState(false);

    const currTime = new Date();
    const postTime = new Date(artifact.timestamp);
    let diffTime = Math.floor((currTime - postTime) / (1000 * 60 *60)); //in hours
    let numDays = 0
    let timeAgo = '';
    if (diffTime < 24) {
        timeAgo = `${diffTime} hours ago`;
    } else {
        numDays = Math.floor(diffTime / 24); 
        timeAgo = `${numDays} days ago`;
    }


    const handlePostClick = () => {
        setShowAllImages(!showAllImages); 
    };
    return (
        <div className={styles.post} onClick={handlePostClick}>
            <div className={styles.owner}>Posted by: {artifact.owner}</div>
            <h2 className={styles.title}>{artifact.title}</h2>
            <p className={styles.description}>{artifact.description}</p>

            {artifact.images && artifact.images.length > 0 && (
                <div className={`${styles.images} ${showAllImages ? styles.showAll : ''}`}>
                    {!showAllImages ? (
                        <img src={`http://localhost:8000${artifact.images[0]}`} alt="Artifact" />
                    ) : (
                        artifact.images.map((image_src, index) => (
                            <img key={index} src={`http://localhost:8000${image_src}`} alt={`Artifact ${index}`} />
                        ))
                    )}
                </div>
            )}

            <p className={styles.timestamp}> Posted {timeAgo}</p>
        </div>
    );
};

export default ArtifactPost;
