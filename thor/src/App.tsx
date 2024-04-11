import React from 'react';
//import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './features/home/Home';
import Compus from './features/compus/Compus';
import NewPost from './features/post/NewPost'
import Post from './features/post/Post';
import Profile from './features/profile/Profile';
import Icons from './features/Icons';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import styles from "./App.module.css";
import { ReactComponent as Logo } from "./logo-GM.svg";

function App() {
  return (

    <div>
      <div className="logo">
      <Logo onClick={() => window.location.reload()} width={250} height={60} />
      </div>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/features/home/Home" element={<Home />} />
        <Route path="/features/compus/Compus" element={<Compus />} />
        <Route path="/features/post/NewPost" element={<NewPost />} />
        <Route path="/features/profile/Profile" element={<Profile />} />
      </Routes>
      
     
    </div>
  );
}

export default App;
