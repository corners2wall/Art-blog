import { forwardRef } from 'react';

interface RowProps {
  children: React.ReactNode;
  className?: string;
  forwardRef?: any;
}

function BaseRow({ children, className, forwardRef }: RowProps) {
  return (
    <div className={`flex flex-1 ${className} `} ref={forwardRef}>
      {children}
    </div>
  );
}

const Row = forwardRef((props: RowProps, forwardRef: any) => (
  <BaseRow {...props} forwardRef={forwardRef} />
));

export default Row;
