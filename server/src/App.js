import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './pages/MyOrder';
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createuser' element={<SignUp />} />
          <Route path='/myorder' element={<MyOrder />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    
  );
}

export default App;
