import React, { useState } from 'react';
import axios from 'axios';

function AddArtifacts() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [upvotes, setUpvotes] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/addartifacts/', {
        title,
        description,
      });
      console.log(response.data);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('There was an error in submission', error);
    }
  };

  return (
    <div>
        <div><h1> Welcome to The Citizen Journal</h1></div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" required />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default AddArtifacts;
