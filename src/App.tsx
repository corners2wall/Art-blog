import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import Custom from './pages/Custom';

export default function Application() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Custom />
    </ErrorBoundary>
  );
}
