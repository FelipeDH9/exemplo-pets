import React, { useState, useEffect } from 'react';
import './ListCar.css';

const url = 'http://localhost:3000/carros';

const ListCar = () => {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCarro, setSelectedCarro] = useState(null);
    const [formData, setFormData] = useState({ modelo: '', marca: '', ano: '', valor: '', cor: '', image: '' });

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Falha ao tentar ler os carros');
                }
                const data = await response.json();
                setCarros(data.carros);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCarros();
    }, []);

    const deleteCarro = async (id) => {
        
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Falha ao excluir o carro');
            }
            setCarros(carros.filter((carro) => carro.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditClick = (carro) => {
        setSelectedCarro(carro);
        setFormData({ ...carro });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, image: file }));

        
    };

    const updateCarro = async () => {
        try {
            const response = await fetch(`${url}/${selectedCarro.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Falha ao atualizar o Carro');
            }
            setCarros(carros.map((carro) => (carro.id === selectedCarro.id ? formData : carro)));
            setSelectedCarro(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Carregando carros...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="pet-list-container">
            <h2>Lista de carros</h2>
            {carros.length === 0 ? (
                <p>Nenhum pet encontrado :(</p>
            ) : (
                <table className="pet-table">
                    <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>Ano de fabricação</th>
                            <th>Valor do carro</th>
                            <th>Cor</th>
                            <th>Imagem</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carros.map((carro) => (
                            <tr key={carro.id}>
                                <td>{carro.modelo}</td>
                                <td>{carro.marca}</td>
                                <td>{carro.ano}</td>
                                <td>R${carro.valor}</td>
                                <td>{carro.cor}</td>
                                <td>
                                    {carro.image && (
                                        <img
                                            src={`http://localhost:3000/${carro.image}`}
                                            alt={`Imagem de ${carro.nome}`}
                                            className="pet-image"
                                        />
                                    )}
                                </td>
                                <td className="button-group">
                                    <button className="edit-button" onClick={() => handleEditClick(carro)}>Editar</button>
                                    <button className="delete-button" onClick={() => deleteCarro(carro.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedCarro && (
                <div className="edit-form">
                    <h3>Editar Carro</h3>
                    <input
                        type="text"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleInputChange}
                        placeholder="Modelo"
                    />
                    <input
                        type="text"
                        name="marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                        placeholder="Marca"
                    />
                    <input
                        type="text"
                        name="ano"
                        value={formData.ano}
                        onChange={handleInputChange}
                        placeholder="Ano de fabricação"
                    />
                    <input
                        type="number"
                        step="1"
                        name="valor"
                        value={formData.valor}
                        onChange={handleInputChange}
                        placeholder="Valor do carro"
                    />
                    <input
                        type="text"
                        name="cor"
                        value={formData.cor}
                        onChange={handleInputChange}
                        placeholder="Cor"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className="button-group">
                        <button className="save-button" onClick={updateCarro}>Salvar</button>
                        <button className="cancel-button" onClick={() => setSelectedCarro(null)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListCar;
