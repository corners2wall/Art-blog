import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender/FallbackRender';
import Home from './pages/Home';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Home />
    </ErrorBoundary>
  );
}
