import React, { useState, useEffect } from 'react';
import NeuroBank from './pages/NeuroBank';
import './styles/globals.css';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Test if CSS is loaded
      const testElement = document.createElement('div');
      testElement.className = 'hidden';
      document.body.appendChild(testElement);
      const computedStyle = window.getComputedStyle(testElement);
      if (computedStyle.display !== 'none') {
        console.warn('Tailwind CSS may not be loaded correctly');
      }
      document.body.removeChild(testElement);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to initialize app: ' + String(err));
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>App Error</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div>Loading SkyBrain...</div>
      </div>
    );
  }

  try {
    return (
      <div className="App">
        <NeuroBank />
      </div>
    );
  } catch (err) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Render Error</h1>
        <p>Failed to render NeuroBank component: {String(err)}</p>
        <button onClick={() => window.location.reload()}>
          Reload Page
        </button>
      </div>
    );
  }
}

export default App;