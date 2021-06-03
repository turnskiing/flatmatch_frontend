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

function App() {
  return (
    <div>
      <Counter>
        {(count, setCount) => (
          <div>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        )}
      </Counter>
>>>>>>> a2008a7 (Add basic setup)
    </div>
  );
}

export default App;
