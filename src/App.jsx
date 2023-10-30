import './App.css';
import { createContext, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Articles from './components/Articles';
import PostArticle from './components/PostArticle';
import Topics from './components/Topics';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Article from './components/Article';
import Header from './components/Header';
import BadEndpointPage from './components/BadEndpointPage';

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState({username: 'grumpy19', name: 'Paul Grump', avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013'});
  const [currentURL, setCurrentURL] = useState('');
  return (
    <>
    <UserContext.Provider value={{user, setUser}}>
      <div className="rounded border-2px margin-20 bg-white">
        <Header />
        <Nav setCurrentURL={setCurrentURL} />
      </div>
      <Routes>
        <Route path="/" element={<Articles currentURL={currentURL}/>}></Route>
        <Route path="/articles/:article_id" element={<Article />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/create_article" element={<PostArticle />}></Route>
        <Route path="/sign-in" element={<SignIn setUser={setUser} />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/topics/:topic" element={<Articles />}></Route>
        <Route path="/*" element={<BadEndpointPage />}></Route>
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
