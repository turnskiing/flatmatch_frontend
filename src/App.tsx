import React from 'react';
import './App.css';
import Header from "./Header";
import TinderCards from "./TinderCards";
import SwipeButtons from './SwipeButtons'

function App() {
  return (
    <div className="app">
      <Header title={""}/>
      <TinderCards/>
      <SwipeButtons/>
        {/*Tinder Cards*/}
        {/*Buttons*/}

    </div>
  );
}

export default App;
