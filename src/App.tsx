import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GPTResearcher } from 'gpt-researcher-ui';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GPTResearcher 
          apiUrl="https://gptr.app"
          // apiKey="your-api-key-if-needed" 
          defaultPrompt="Why do monkies have hairy faces?"
          // onResultsChange={(results) => console.log('Research results:', results)}
      />
      Something here
    </div>
  );
}

export default App;
