import React, { useState } from 'react';
import './FormUsers.css';

const url = 'http://localhost:3000/users';

const FormUsers = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData,[name]: value}));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend?.append('username', formData.username);
        formDataToSend?.append('password', formData.password);
        formDataToSend?.append('email', formData.email);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setFormData({ username: '', password: '', email: '' });
            } else {
                setMessage(data.message || 'Registration failed');
            }
            // if (!response.ok) {
            //     throw new Error('Failed to add user');
            // }

            // const data = await response.json();

            // alert(`User added successfully! ID: ${data.id}`);

            // clearForm();

        } catch (error) {
            setMessage('An error occurred');
            alert('Error adding user');

        }
    };

    return (
        <div>
            <h2>Cadastro de Usuários</h2>
			<div className="form-container">
				<div className="form-panel">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="field">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
			</div>
			</div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FormUsers;

