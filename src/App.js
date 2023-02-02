import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ItemPage from './pages/ItemPage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import ResetPage from './pages/ResetPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/item" element={ <ItemPage /> } />
        <Route path="/login" element={ <LoginForm /> } />
        <Route path="/register" element={ <RegisterForm /> } />
        <Route path="/resetpass" element={ <ResetPage /> } />
        <Route path="/cart" element={ <CartPage /> } />
        <Route path="/dashboard" element={ <DashboardPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
