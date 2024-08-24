import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListingCreate() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        year: '',
        engine: '',
        listing_photo: null,
        currency: '',
        region: '',
        brand: '',
        model_name: '',
        body_type: ''
    });
    const [brandsModels, setBrandsModels] = useState({brands: [], brandsModels: {}});
    const [selectedBrand, setSelectedBrand] = useState('');
    const [models, setModels] = useState([]);
    const [regions, setRegions] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [currencies, setCurrencies] = useState([]);
    const [stats, setStats] = useState(null);


    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: 'auto',
        gap: '10px', // Промежуток между полями
    };

    const inputStyle = {
        padding: '8px 10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    };

    useEffect(() => {
        const fetchBrandModelData = async () => {
            try {
                const {data} = await axios.get('api/cars/data/');
                setBrandsModels(data);
            } catch (error) {
                setError('Ошибка при загрузке данных о брендах и моделях');
            }
        };
        fetchBrandModelData();
    }, []);


    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await axios.get('api/listings/regions/');

                setRegions(response.data.regions);
                console.log('Загруженные регионы:', response.data.regions);
            } catch (error) {
                console.error('Ошибка при загрузке регионов:', error);
            }
        };

        fetchRegions();
    }, []);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const {data} = await axios.get('api/currencies/list/')

                setCurrencies(data);

                console.log('Загруженные валюты:', data);
            } catch (error) {
                console.error('Ошибка при загрузке валют:', error);
            }
        };

        fetchCurrencies();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        console.log('token:', token);
        console.log('Sending request with token:', `Bearer ${token}`);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        // Логирование для проверки отправляемых данных
        for (let pair of formDataToSend.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await axios.post('api/listings/create/', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate(`/upload-photo/${response.data.id}`);
        } catch (error) {
            console.error('Ошибка запроса:', error.response || error);
            setError(error.response?.data?.detail || 'Произошла ошибка при создании объявления');
        }
    };

    const handleBrandChange = (event) => {
        const brandId = event.target.value;
        setSelectedBrand(brandId);
        setFormData({...formData, brand: brandId, model_name: ''});

        // Используем brandId напрямую, если brands_models настроен как объект, где ключи — это brandId
        const filteredModels = brandsModels.brands_models[brandId] || [];
        console.log(filteredModels); // Проверьте фильтрованные модели
        setModels(filteredModels);
    };


    const handleChange = (event) => {
        const {name, value} = event.target;

        // Если это регион, переводим значение в нижний регистр, кроме первой буквы
        if (name === "region") {
            const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            setFormData(prev => ({
                ...prev,
                [name]: formattedValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        console.log(`Изменение ${name}: ${value}`);
    };


    const handleFileChange = (event) => {
        setFormData({...formData, listing_photo: event.target.files[0]});
    };


    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title"
                   style={inputStyle}/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"
                      style={{...inputStyle, height: '100px'}}/>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price"
                   style={inputStyle}/>
            <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year"
                   style={inputStyle}/>
            <input type="text" name="engine" value={formData.engine} onChange={handleChange} placeholder="Engine"
                   style={inputStyle}/>

            <select name="region" value={formData.region} onChange={handleChange} style={inputStyle}>
                <option value="">Выберите регион</option>
                {regions.map((region, index) => (
                    <option key={index} value={region[1]}>{region[0]}</option>
                ))}
            </select>

            <select name="currency" value={formData.currency} onChange={handleChange} style={inputStyle}>
                <option value="">Выберите валюту</option>
                {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>{currency.code}</option>
                ))}
            </select>

            <select name="brand" value={formData.brand} onChange={handleBrandChange} style={inputStyle}>
                <option value="">Select Brand</option>
                {brandsModels.brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
            </select>

            <select name="model_name" value={formData.model_name} onChange={handleChange} style={inputStyle}>
                <option value="">Select Model</option>
                {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                ))}
            </select>

            <select name="body_type" value={formData.body_type} onChange={handleChange} style={inputStyle}>
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

            <input type="file" name="listing_photo" onChange={handleFileChange} style={inputStyle}/>
            <button type="submit" style={buttonStyle}>Create Listing</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    );

}
export default ListingCreate;
