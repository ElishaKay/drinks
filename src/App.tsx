import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GPTResearcher } from 'gpt-researcher-ui';

function App() {
  return (
    <div className="App">
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
