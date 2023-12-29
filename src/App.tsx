import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import NotFound from './pages/NotFound';
import Custom from './pages/Custom';
import Home from './pages/Home';
import Example from './pages/Example';
import SimpleExample from './pages/R3F/R3F';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {/* <Home /> */}
      {/* <Custom /> */}
      <SimpleExample />
      {/* <Example /> */}
      {/* <NotFound /> */}
    </ErrorBoundary>
  );
}
