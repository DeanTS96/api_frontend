import { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Articles from './components/Articles';
import CreateArticle from './components/CreateArticle';
import Topics from './components/Topics';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
    <h1>NC News</h1>
    <Nav/>
    <Routes>
      <Route path="/articles" element={<Articles/>}></Route>
      <Route path="/topics" element={<Topics/>}></Route>
      <Route path="/create_article" element={<CreateArticle/>}></Route>
      <Route path="/" element={<SignIn/>}></Route>
      <Route path="/sign_up" element={<SignUp/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
    </>
  )
}

export default App
