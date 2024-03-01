// src/App.js
import React, { useState } from 'react';
import FileInput from './components/FileInput';
import SortingVisualizer from './components/SortingVisualizer';
import Title from './components/Title';
import * as sortingAlgorithms from './utils/sortingAlgorithms';

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubbleSort');

  const handleFileUpload = (fileNumbers) => {
    setNumbers(fileNumbers);
  };

  return (
    <div className="app">
      <Title />
      {/* <FileInput onFileUpload={handleFileUpload} /> */}
      <SortingVisualizer numbers={numbers} algorithm={algorithm} />
    </div>
  );
};

export default App;
