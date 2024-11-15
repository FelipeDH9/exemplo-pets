import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import FormPet from './components/FormPet/FormPet';
import ListPet from './components/ListPet/ListPet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {
  return (
	<BrowserRouter>
	  <div className='app-container'>
	  <Header />
	  <main>
		<Routes>
			<Route path='/' element={<Home/>} />
			<Route path='/form-pet' element={<FormPet/>} />
			<Route path='/list-pet' element={<ListPet/>} />
			<Route path='/contact' element={<Contact/>} />
		</Routes>
	  </main>
	  <Footer />
	  </div>
	</BrowserRouter>
  );
}

export default App;
