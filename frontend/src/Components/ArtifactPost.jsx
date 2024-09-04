import React from 'react';

const ArtifactPost = ({ artifact }) => {
    const owner = localStorage.getItem("username");

    return (
        <div className="artifact-post">
            <div className="artifact-owner">Posted by: {owner}</div>
            <h2 className="artifact-title">{artifact.title}</h2>
            <p className="artifact-description">{artifact.description}</p>
            {artifact.images && artifact.images.length > 0 && (
                <div className="artifact-images">
                    {artifact.images.map((image_src, index) => (
                        <img key={index} src={`http://localhost:8000${image_src}`} alt={`Artifact ${index}`} />
                    ))}
                </div>
            )}

            <p className="artifact-timestamp">Posted on: {artifact.timestamp}</p>
        </div>
    );
}

export default ArtifactPost;
