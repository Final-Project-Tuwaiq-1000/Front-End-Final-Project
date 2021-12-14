import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import NavBar from './component/NavBar';
import Home from './component/Home';
import LogIn from './component/LogIn';
import SignUp from './component/SignUp';

function App() {

  const navigate = useNavigate()
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/LogIn" element={<LogIn/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
    </Routes>
    </>
  );
}

export default App;
