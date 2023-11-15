import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import NotFound from './pages/NotFound';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {/* <Home /> */}
      {/* <Custom /> */}
      {/* <Example /> */}
      <NotFound />
    </ErrorBoundary>
  );
}
