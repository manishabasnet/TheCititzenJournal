import styles from "./ArtifactPost.module.css";
import axios from 'axios';
import {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const ArtifactPost = ({ artifact }) => {

    const token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id');
    const hasUserLiked = () => {
        return artifact.likes.includes(user_id);
    };
    const [showAllImages, setShowAllImages] = useState(false);
    const [liked, setLiked] = useState(hasUserLiked())
    const [likes, setLikes] = useState(artifact.likes.length)


    const handleLikes = async (e) => {
        if (liked) {
            setLikes(likes-1)
        }
        else{
            setLikes(likes+1)
        }
        setLiked(!liked)   

        try {
            // Make a POST request to the login endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/updatelikes/', {
              user_id,
              "artifact_id": artifact._id,
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }); 
          } catch (error) {
            console.error('Couldnt update like count', error);
          }
    };

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
            <p className={styles.timestamp}> Posted {timeAgo}</p>
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

            <div className = {styles.likebox}>
                <button className={`${styles["heart-button"]} ${liked ? styles["liked"] : ''}`} onClick={handleLikes}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <p> {likes}</p>
             </div>

        </div>
    );
};

export default ArtifactPost;



