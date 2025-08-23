import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router';
import { RouterRoute } from './routes/routerConfig';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <RouterRoute></RouterRoute>
     </BrowserRouter>
    </div>
  );
}

export default App;
