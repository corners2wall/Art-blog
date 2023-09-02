import {FallbackProps} from 'react-error-boundary';

export default function fallbackRender({ error }: FallbackProps) {
  debugger;
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        {error.message && <span>Here's the error:  <pre style={{ color: "red" }}>{error.message}</pre></span>}
      </div>
    );
}
