import { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Articles from './components/Articles';
import CreateArticle from './components/CreateArticle';
import Topics from './components/Topics';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Article from './components/Article';
import {Routes, Route} from 'react-router-dom';

function App() {

  return (
    <>
    <h1>NC News</h1>
    <Nav/>
    <Routes>
      <Route path="/" element={<Articles/>}></Route>
      <Route path="/articles/:article_id" element={<Article/>}></Route>
      <Route path="/topics" element={<Topics/>}></Route>
      <Route path="/create_article" element={<CreateArticle/>}></Route>
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/topics/:topic" element={<Articles/>}></Route>
    </Routes>
    </>
  )
}

export default App