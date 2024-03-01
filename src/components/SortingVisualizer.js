// src/components/SortingVisualizer.js
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { measureExecutionTime } from '../utils/timing';
import * as sortingAlgorithms from '../utils/sortingAlgorithms';
import FileInput from './FileInput';

const SortingVisualizer = () => {
  const chartRef = useRef(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [sortingTime, setSortingTime] = useState(null);
  const [fastestAlgorithm, setFastestAlgorithm] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const chartInstanceRef = useRef(null);

  const numbers = fileContent.split(/\s+/).map(Number);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: numbers.length }, (_, i) => i + 1),
        datasets: [
          {
            label: 'Numbers',
            data: numbers,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
        },
      },
    });

    // Save the current chart instance
    chartInstanceRef.current = chart;

    // Call the selected sorting algorithm and measure execution time
    const result = measureExecutionTime(() => {
      const numbersCopy = [...numbers];
      sortingAlgorithms[selectedAlgorithm](numbersCopy);
      updateChart(chart, numbersCopy);
    });

    setSortingTime(result);
  }, [numbers, selectedAlgorithm]);

  useEffect(() => {
    // Call sorting algorithms and measure execution times to find the fastest one
    const algorithms = Object.keys(sortingAlgorithms);
    const results = algorithms.map((algorithm) => {
      const time = measureExecutionTime(() => {
        const numbersCopy = [...numbers];
        sortingAlgorithms[algorithm](numbersCopy);
      });

      return {
        algorithm,
        time,
      };
    });

    const fastest = results.reduce((min, result) =>
      result.time < min.time ? result : min
    );

    setFastestAlgorithm(fastest.algorithm);
  }, [numbers]);

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleFileSelect = (content) => {
    setFileContent(content);
  };

  return (
    <div>
      <FileInput onFileSelect={handleFileSelect} />
      <div>
        <label>Select Sorting Algorithm : </label>
        <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
          {Object.keys(sortingAlgorithms).map((algorithm) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
      </div>
      <canvas ref={chartRef} />
      {sortingTime !== null && (
        <div>
          <p>Sorting time: {sortingTime.toFixed(2)} milliseconds</p>
        </div>
      )}
      {fastestAlgorithm !== null && (
        <div>
          <p>Fastest Algorithm: {fastestAlgorithm}</p>
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;

const updateChart = (chart, updatedNumbers) => {
  chart.data.datasets[0].data = updatedNumbers;
  chart.update();
};
