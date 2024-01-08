import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import Somefolk from './pages/Somefolk';
import Home from './pages/Home';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {/* <Home /> */}
      <Somefolk />
    </ErrorBoundary>
  );
}
