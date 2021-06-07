import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://redcap.test/plugins/dashboard';

axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = localStorage.getItem('token');    
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function App() {

  const storedJwt = localStorage.getItem('token');
  const [test, setTest] = useState([]);
  const [jwt, setJwt] = useState(storedJwt || null);
  const [fetchError, setFetchError] = useState(null);

  const getJwt = async () => {
    const { data } = await axios.get(`${apiUrl}/dashboard_endpoint.php`);
    localStorage.setItem('token', data.token);
    setJwt(data.token);
  };

  const getTest = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/test.php`)
      setTest(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
      <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getTest()}>
          Get Test
        </button>
        {test && (
          <pre>
            <code>{test}</code>
          </pre>
        )}
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>
    </>
  );
}

export default App;
