import Preview from './screens/Preview';
import Navigation from './components/Navigation';
import Content from './screens/Content';
import NoNameComponent from './components/NoNameComponent';
import { useSubscribe } from './utils/EventBus';
import { DUPLICATE_CONTENT } from './utils/chanelName';
import React, { useRef, useState } from 'react';
import ABOBA from './pages/Test';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-black'>
      {/* <ABOBA /> */}
      <Navigation />
      <main className='flex'>
        <Preview />
        <Content />
      </main>
      <NoNameComponent />
    </div>
  );
}

export default App;
