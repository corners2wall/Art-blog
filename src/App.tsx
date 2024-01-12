import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import Somefolk from './pages/Somefolk';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Somefolk />
    </ErrorBoundary>
  );
}
