import React from 'react';
import Navigation from './src/navigation/NavigationContainer';

import { PeopleProvider } from './src/context/PeopleContext';

const App = () => {
  return (
    <PeopleProvider>
      <Navigation />
    </PeopleProvider>
  );
};

export default App;
