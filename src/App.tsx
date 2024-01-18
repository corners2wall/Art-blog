import { ErrorBoundary } from 'react-error-boundary';
import fallbackRender from './components/FallbackRender';
import Somefolk from './pages/Somefolk';
import { ApplicationWrapper } from './container/ApplicationContext';

export default function Application() {
  return (
    <ApplicationWrapper>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Somefolk />
      </ErrorBoundary>
    </ApplicationWrapper>
  );
}
