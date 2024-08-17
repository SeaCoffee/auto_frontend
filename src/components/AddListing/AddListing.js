import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateListingPage = () => {
  const [brands, setBrands] = useState([]);
  const [allModels, setAllModels] = useState([]); // Все модели, которые будем фильтровать
  const [models, setModels] = useState([]); // Отфильтрованные модели
  const [selectedBrand, setSelectedBrand] = useState('');
  const [listingData, setListingData] = useState({
    model_name: '',
    body_type: '',
    year: '',
    engine: '',
    title: '',
    description: '',
    price: '',
    currency: '',
    region: '',
    listing_photo: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('/api/cars/data/')
      .then(response => {
        setBrands(response.data.brands);
        setAllModels(response.data.models);  // сохраним все модели и будем фильтровать по бренду
      })
      .catch(error => console.error('Failed to load brand and model data', error));
  }, []);

  const handleBrandChange = (e) => {
    const selectedBrandId = e.target.value;
    setSelectedBrand(selectedBrandId);
    setModels(allModels.filter(model => model.brand === selectedBrandId));
    setListingData({ ...listingData, model_name: '' }); // Сбросить выбор модели при смене бренда
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListingData({
      ...listingData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setListingData({
      ...listingData,
      listing_photo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(listingData).forEach((key) => {
      formData.append(key, listingData[key]);
    });

    axios.post('/api/listings/', formData)
      .then((response) => {
        setSuccess('Listing created successfully!');
        setError('');
      })
      .catch((error) => {
        setError('Failed to create listing.');
        setSuccess('');
      });
  };

  return (
    <div>
      <h2>Create New Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>Brand</label>
        <select name="brand" value={selectedBrand} onChange={handleBrandChange} required>
          <option value="">Select Brand</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <label>Model Name</label>
        <select name="model_name" value={listingData.model_name} onChange={handleChange} required>
          <option value="">Select Model</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>

        <label>Body Type</label>
        <select name="body_type" value={listingData.body_type} onChange={handleChange} required>
          <option value="">Select Body Type</option>
          <option value="sedan">Sedan</option>
          <option value="hatchback">Hatchback</option>
          <option value="suv">SUV</option>
          <option value="wagon">Wagon</option>
          <option value="coupe">Coupe</option>
          <option value="convertible">Convertible</option>
          <option value="minivan">Minivan</option>
          <option value="pickup">Pickup</option>
        </select>

        <label>Year</label>
        <input type="number" name="year" value={listingData.year} onChange={handleChange} required />

        <label>Engine</label>
        <input type="text" name="engine" value={listingData.engine} onChange={handleChange} required />

        <label>Title</label>
        <input type="text" name="title" value={listingData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={listingData.description} onChange={handleChange} required />

        <label>Price</label>
        <input type="number" name="price" value={listingData.price} onChange={handleChange} required />

        <label>Currency</label>
        <input type="text" name="currency" value={listingData.currency} onChange={handleChange} required />

        <label>Region</label>
        <input type="text" name="region" value={listingData.region} onChange={handleChange} required />

        <label>Listing Photo</label>
        <input type="file" name="listing_photo" onChange={handleFileChange} required />

        <button type="submit">Create Listing</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default CreateListingPage;

