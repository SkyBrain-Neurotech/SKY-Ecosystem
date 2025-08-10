import React from 'react';

function App() {
  // Add immediate console log to verify JS is loading
  console.log('App component loaded successfully!');

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
        🧠 SkyBrain NeuroBank
      </h1>
      <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '20px' }}>
        App is working! JavaScript loaded successfully.
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fff', 
        borderRadius: '8px',
        border: '2px solid #4CAF50'
      }}>
        <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>✅ Status Check</h2>
        <ul style={{ color: '#333', lineHeight: '1.6' }}>
          <li>✅ HTML loaded</li>
          <li>✅ JavaScript executed</li>
          <li>✅ React component rendered</li>
          <li>✅ Styles applied</li>
        </ul>
      </div>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <strong>Environment:</strong> {typeof window !== 'undefined' ? 'Browser' : 'Server'}
        <br />
        <strong>Timestamp:</strong> {new Date().toISOString()}
      </div>
    </div>
  );
}

export default App;