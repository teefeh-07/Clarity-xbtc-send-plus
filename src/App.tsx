import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <h1>Clarity xBTC Send Plus</h1>
        <div className="card">
          <p>
            Welcome to the future of Stacks transactions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App