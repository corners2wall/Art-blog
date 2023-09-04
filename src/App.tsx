import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender/FallbackRender';
import Root from './pages/Root';
import ReactRouter from 'react-router';

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Root />
    </ErrorBoundary>
  );
}

export default App;
