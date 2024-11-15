import React, { useState } from 'react';
import './FormCar.css';

const url = 'http://localhost:3000/carros';

const FormCar = () => {
    const [formData, setFormData] = useState({
        modelo: '',
        marca: '',
        ano: '',
        valor:'',
        cor: '',
        image: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: file }));
    };

    const clearForm = () => {
        setFormData({ modelo: '',
            marca: '',
            ano: '',
            valor:'',
            cor: '',
            image: ''  });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('modelo', formData.modelo);
        formDataToSend.append('marca', formData.marca);
        formDataToSend.append('ano', formData.ano);
        formDataToSend.append('valor', formData.valor);
        formDataToSend.append('cor', formData.cor);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to add car');
            }

            const data = await response.json();

            alert(`Car added successfully! ID: ${data.id}`);

            clearForm();
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding car');
        }
    };

    return (
        <div className="form-container">
            <div className="form-panel">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Modelo do carro:</label>
                        <input
                            type="text"
                            name="modelo"
                            value={formData.modelo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="field">
                        <label>Marca do carro:</label>
                        <input
                            type="text"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Ano:</label>
                        <input
                            type="text"
                            name="ano"
                            value={formData.ano}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Valor do carro:</label>
                        <input
                            type="number"
                            step="1"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Cor do carro:</label>
                        <input
                            type="text"
                            name="cor"
                            value={formData.cor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field">
                        <label>Imagem:</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange} 
                        />
                    </div>
                    <button type="submit">Salvar</button>
                </form>
            </div>
            <div className="image-panel">
                {formData.image && (
                    <div className="image-preview">
                        <h3>Imagem Selecionada:</h3>
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="preview-image"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormCar;
