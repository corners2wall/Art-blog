import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender/FallbackRender';
import Home from './pages/Home';
import Custom from './pages/Custom';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {/* <Home /> */}
      <Custom />
    </ErrorBoundary>
  );
}
