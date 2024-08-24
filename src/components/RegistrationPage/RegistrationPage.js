import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistrationPage() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        name: '',
        surname: '',
        age: '',
        city: '',
        roleId: '',  // Начальное значение для roleId оставляем пустым
    });

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Загрузка списка ролей при монтировании компонента
        const fetchRoles = async () => {
            try {
                const response = await axios.get('/api/auth/roles/');
                setRoles(response.data.data); // Получаем массив ролей из поля `data`
            } catch (error) {
                console.error('Failed to fetch roles', error);
            }
        };
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'roleId' ? parseInt(e.target.value) : e.target.value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();  // предотвращает отправку формы по умолчанию, которая вызывает GET запрос

    const profileData = {
        name: formData.name,
        surname: formData.surname,
        age: formData.age,
        city: formData.city,
    };

    const user = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.roleId,  // Обратите внимание, что это roleId, если бекенд принимает это поле
        profile: profileData,
    };

    try {
        const response = await axios.post('/api/users/', user);
        console.log('Registration successful', response.data);
    } catch (error) {
        console.error('Registration error', error.response.data);
    }
};


    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="text" name="surname" placeholder="Surname" onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} />
            <input type="text" name="city" placeholder="City" onChange={handleChange} />
            <select name="roleId" onChange={handleChange} value={formData.roleId} required>
                <option value="">Select Role</option>
                {Array.isArray(roles) ? roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                )) : <option disabled>Loading roles...</option>}
            </select>

            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationPage;

