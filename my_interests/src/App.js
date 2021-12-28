import { Route, Routes } from 'react-router';
import './App.css';
import NavBar from './component/NavBar';
import Home from './component/Home';
import LogIn from './component/LogIn';
import SignUp from './component/SignUp';
import Profile from './component/Profile';
import Post from './component/Post';
import CreatePost from './component/CreatePost';
import UpdatePost from './component/UpdatePost';
import UpdateUser from './component/UpdateUser';
import Follow from './component/Follow';
import Topic from './component/Topic';
import Search from './component/Search';

function App() {

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/LogIn" element={<LogIn/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/:user_id" element={<Profile/>}/>
      <Route path="/Post/:post_id" element={<Post/>}/>
      <Route path="/CreatePost" element={<CreatePost/>}/>
      <Route path="/UpdatePost/:post_id" element={<UpdatePost/>}/>
      <Route path="/UpdateUser/:user_id" element={<UpdateUser/>}/>
      <Route path="/Follow" element={<Follow/>}/>
      <Route path="/Topic/:topic_id" element={<Topic/>}/>
      <Route path="/Search" element={<Search/>}/>
    </Routes>
    </>
  );
}

export default App;
