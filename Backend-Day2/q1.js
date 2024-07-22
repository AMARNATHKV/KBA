async function fetchDataWithTimeout(url, timeout) {
  const controller = new AbortController();
  const signal = controller.signal;

  
  const timeoutId = setTimeout(() => {
    controller.abort();
    console.log('Request timed out');
  }, timeout);

  try {
    const response = await fetch(url, { signal });

    // Clear the timeout since the request completed within the timeout period
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', error.message);
    }
    return null;
  }
}


const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
const requestTimeout = 5000; // Timeout in milliseconds

fetchDataWithTimeout(apiUrl, requestTimeout)
  .then(data => {
    if (data) {
      console.log('Data fetched successfully:', data);
      // Process the fetched data
    } else {
      console.log('No data fetched');
      // Handle case where no data was fetched
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    
  });
