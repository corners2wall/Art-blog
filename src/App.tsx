import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import Home from './pages/Home';
import Custom from './pages/Custom';
import Example from './pages/Example';
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
