import React from 'react';
import './App.css';
import PathFinderGrid from './components/PathFinderGrid';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 

function App() {
  return (
    <div className="App">
      <PathFinderGrid />
    </div>
  );
}

export default App;
