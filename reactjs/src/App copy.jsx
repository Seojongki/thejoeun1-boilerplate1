import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import AticlePage from './pages/AticlePage';
import Layout from './layout/Layout'
import { useCookies } from 'react-cookie';


function App() {
  const navigate = useNavigate();


  const [cookies, setCookie, removeCookie] = useCookies(['token']); //쿠키    
  let isLogin = false;    
  if (cookies.token){
      isLogin = true;
  }




  return (
    <Layout>
      <Routes>
        {!isLogin && <Route path="/" element={<HomePage />} />}
        {isLogin && <Route path="/" element={<AticlePage />} />}        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
