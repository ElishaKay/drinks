declare module 'gpt-researcher-ui' {
  import React from 'react';

  export interface GPTResearcherProps {
    apiKey?: string;
    defaultPrompt?: string;
    onResultsChange?: (results: any) => void;
    // Add any other props from GPTResearcher.tsx here
  }

  export const GPTResearcher: React.FC<GPTResearcherProps>;
}