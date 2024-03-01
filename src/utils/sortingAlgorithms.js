// src/utils/sortingAlgorithms.js

// Helper function to swap elements in an array
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  
  // Bubble Sort
  export const bubbleSort = (arr) => {
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
    }
  
    return arr;
  };
  
  // Insertion Sort
  export const insertionSort = (arr) => {
    const n = arr.length;
  
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
  
      arr[j + 1] = key;
    }
  
    return arr;
  };
  
  // Quick Sort
  export const quickSort = (arr) => {
    const n = arr.length;
  
    const partition = (low, high) => {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          swap(arr, i, j);
        }
      }
  
      swap(arr, i + 1, high);
      return i + 1;
    };
  
    const sort = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    };
  
    sort(0, n - 1);
    return arr;
  };
  
  // Merge Sort
  export const mergeSort = (arr) => {
    const merge = (left, right) => {
      const result = [];
      let i = 0;
      let j = 0;
  
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
  
      return result.concat(left.slice(i)).concat(right.slice(j));
    };
  
    const sort = (arr) => {
      const n = arr.length;
  
      if (n <= 1) {
        return arr;
      }
  
      const mid = Math.floor(n / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
  
      return merge(sort(left), sort(right));
    };
  
    return sort(arr);
  };
  
  // Selection Sort
  export const selectionSort = (arr) => {
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      swap(arr, i, minIndex);
    }
  
    return arr;
  };
  
  // Radix Sort
  export const radixSort = (arr) => {
    const getMax = () => {
      let max = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
        }
      }
      return max;
    };
  
    const countingSort = (arr, exp) => {
      const n = arr.length;
      const output = new Array(n).fill(0);
      const count = new Array(10).fill(0);
  
      for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
      }
  
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
  
      for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
      }
  
      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
      }
    };
  
    const max = getMax();
  
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp);
    }
  
    return arr;
  };
  
  // Counting Sort
  export const countingSort = (arr) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(256).fill(0);
  
    for (let i = 0; i < n; i++) {
      count[arr[i]]++;
    }
  
    for (let i = 1; i < 256; i++) {
      count[i] += count[i - 1];
    }
  
    for (let i = n - 1; i >= 0; i--) {
      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
    }
  
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }
  
    return arr;
  };
  
  // Heap Sort
  export const heapSort = (arr) => {
    const n = arr.length;
  
    const heapify = (arr, n, i) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
  
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
  
      if (largest !== i) {
        swap(arr, i, largest);
        heapify(arr, n, largest);
      }
    };
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
  
    // Extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i);
      heapify(arr, i, 0);
    }
  
    return arr;
  };
  