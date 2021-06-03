<<<<<<< HEAD
<<<<<<< HEAD
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

=======
import "./App.css";
import { Counter } from "./Counter";
=======
import React from "react";
import SignInSide  from './views/SignInView'
>>>>>>> e0f95e6 (Add sign in view)

function App() {
  return (
    <div>
<<<<<<< HEAD
      <Counter>
        {(count, setCount) => (
          <div>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        )}
      </Counter>
>>>>>>> a2008a7 (Add basic setup)
=======
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <SignInSide/>
>>>>>>> e0f95e6 (Add sign in view)
    </div>
  );
}

export default App;
