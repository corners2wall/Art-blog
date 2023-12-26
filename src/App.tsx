import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import NotFound from './pages/NotFound';
import Custom from './pages/Custom';
import Home from './pages/Home';
import Example from './pages/Example';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {/* <Home /> */}
      <Custom />
      {/* <Example /> */}
      {/* <NotFound /> */}
    </ErrorBoundary>
  );
}
