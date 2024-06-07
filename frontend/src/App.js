import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import EditContact from './pages/EditContact';

import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        {/* <div className='px-4'> */}
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/contacts/:id' element={<EditContact />} />
        </Routes>
        {/* </div> */}
        <Footer />
      </Router >
      <ToastContainer />
    </>

  );
}

export default App;
