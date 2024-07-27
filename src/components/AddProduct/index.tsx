import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://fakestoreapi.com/products', {
        title,
        price: parseFloat(price),
        description,
        category,
        image,
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('');
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImage('');
      }
    } catch (error) {
      setSuccess(false);
      setError('Error adding product');
    }
  };

  return (
    <div className="container max-w-[50%] bg-gray-600 top-0 absolute  p-5 mt-10" onClick={(e) => e.stopPropagation()}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add a New Product
      </Typography>
      {success && <Typography color="primary">Product added successfully!</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <TextField
          label="Image URL"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
