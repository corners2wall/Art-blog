import Preview from './screens/Preview';
import Navigation from './components/Navigation';
import Content from './screens/Content';
import HomeFooter from './components/HomeFooter';
import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender/FallbackRender';

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <div className='min-h-screen flex flex-col bg-black'>
        <Navigation />
        <main className='flex'>
          <Preview />
          <Content />
        </main>
        <HomeFooter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
