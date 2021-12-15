import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import NavBar from './component/NavBar';
import Home from './component/Home';
import LogIn from './component/LogIn';
import SignUp from './component/SignUp';
import Profile from './component/Profile';
import Post from './component/Post';
import CreatePost from './component/CreatePost';

function App() {

  const navigate = useNavigate()
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/LogIn" element={<LogIn/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/:user_id" element={<Profile/>}/>
      <Route path="/post/:post_id" element={<Post/>}/>
      <Route path="/CreatePost" element={<CreatePost/>}/>
    </Routes>
    </>
  );
}

export default App;
