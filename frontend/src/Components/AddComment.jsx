import {useState, useEffect} from "react";
import axios from 'axios';
import styles from "./AddComment.module.css";

const AddComment = ({artifact, updateCounts}) => {
    const token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id');
    const [comment, setComment] = useState("");

    const addComment = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/api/addcomment/', {
            user_id,
            "artifact_id": artifact._id,
            comment,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response.data);
          setComment("");
          // TODO: Fix the issue of comment not adding instantly in the frontend
          updateCounts();
        } catch (error) {
          console.error('There was an error adding your comment!', error);
        }
      };

      return (
        <div className={styles.commentbox}>
            <form onSubmit={addComment} className={styles.form}>
                <input 
                    type="text"  
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Your comment" 
                    required 
                />
                <button className={styles.button} type="submit">Post</button>
            </form>
        </div>
    );
}
export default AddComment;