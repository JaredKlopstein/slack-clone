import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.js'
import Sidebar from './components/Sidebar.js'
import styled from 'styled-components';
import Chat from './components/Chat.js';
import {useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase.js'
import Login from './components/Login.js'
import Spinner from 'react-spinkit'

function App() {
  const [user, loading ] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContent>
        <img src="https://yt3.googleusercontent.com/ytc/AMLnZu-yMpgW2GbsNpKhk-j8tV6258JzCIRS9WA1TyeM_A=s900-c-k-c0x00ffffff-no-rj" alt="" />
        <Spinner name="ball-spin-fade-loader"
        color="purple"
        fadeIn="none"/>
        </AppLoadingContent>
      </AppLoading>
    )
  }
  return (
    <div className="app">
      <Router>
        {!user? (
          <Login></Login>
        ) : (
          <>
        <Header></Header>
        <AppBody>
          <Sidebar/>
        <Routes>
          <Route path="/" exact element={<>
          <Chat></Chat>
          </>}/>
        </Routes>
        </AppBody>
        </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;


const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin: 40px;
  }
`;

const AppBody = styled.div`
display:flex;
height: 100vh;
`;