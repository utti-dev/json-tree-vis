import React, { useState } from 'react';
import './App.css';
import TreeVisualizer from './TreeVisualizer';

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "Alice",
    "address": {
      "city": "Wonderland",
      "zip": null
    },
    "roles": ["admin", "editor"]
  },
  "items": [
    { "name": "Item 1", "qty": 2 },
    { "name": "Item 2", "qty": 5 }
  ]
}`;

function App() {
  const [text, setText] = useState(SAMPLE_JSON);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  function onVisualize() {
    try {
      const parsed = JSON.parse(text);
      setData(parsed);
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setData(null);
    }
  }

  function onClear() {
    setText('');
    setData(null);
    setError('');
    setSearch('');
  }

  return (
    <div className="app-root">
      <div className="panel">
        <h2>JSON Tree Visualizer</h2>
        <textarea
          className="json-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste JSON here..."
        />
        <div className="controls">
          <button onClick={onVisualize}>Generate Tree</button>
          <button onClick={onClear}>Clear</button>
          <input
            className="search"
            placeholder="Search path, e.g. $.user.address.city or items[0].name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{fontSize:12, marginTop:8, color:'#444'}}>
          Tip: include leading $ for absolute paths (e.g. $.user.roles[0]) or use array notation like items[0].name
        </div>
      </div>

      <div className="visualizer">
        <TreeVisualizer json={data} searchPath={search} />
      </div>
    </div>
  );
}

export default App;
