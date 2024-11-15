import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import FormCar from './components/FormCar/FormCar';
import FormUsers from './components/FormUsers/FormUsers';
import ListCar from './components/ListCar/ListCar';
import ListUsers from './components/ListUsers/ListUsers';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; 

import './App.css';

function App() {
    const [, setToken] = useState(localStorage.getItem('token') || null);

    const handleLogin = (newToken) => {
        setToken(newToken);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <BrowserRouter>
            <div className='app-container'>
                <Header onLogout={handleLogout} />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login onLogin={handleLogin} />} />
                        <Route 
                            path='/form-pet' 
                            element={
                                <PrivateRoute>
                                    <FormCar />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path='/form-users' 
                            element={
                                <PrivateRoute>
                                    <FormUsers />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path='/list-pet' 
                            element={
                                <PrivateRoute>
                                    <ListCar />
                                </PrivateRoute>
                            } 
                        />
                        <Route 
                            path='/list-users' 
                            element={
                                <PrivateRoute>
                                    <ListUsers />
                                </PrivateRoute>
                            } 
                        />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='*' element={<h1>Página não encontrada</h1>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
