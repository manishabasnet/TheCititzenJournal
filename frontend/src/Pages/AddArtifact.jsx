import React, { useState } from 'react';
import axios from 'axios';

function AddArtifacts() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); 

  const token = localStorage.getItem('access_token');

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('owner', localStorage.getItem('username'));
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await axios.post('http://localhost:8000/api/addartifact/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      console.log(response.data);
      setTitle('');
      setDescription('');
      setImages([]); 
    } catch (error) {
      console.error('Artifact addition was unsuccessful', error);
    }
  };

  return (
    <div>
      <div><h1> Add your artifact details here.</h1></div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" required />
        <input type="file" name="images" accept="image/jpeg,image/png,image/gif" multiple onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddArtifacts;
