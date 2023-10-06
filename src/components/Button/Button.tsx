interface ButtonProps {
  label: string;
  onClick(): void;
  className: string;
}

export default function Button({ label, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border border-white text-black bg-white px-12 py-1 text-xs uppercase rounded-full leading-none
        transition ease-out duration-300 hover:bg-black hover:text-white ${className}`}
    >
      {label}
    </button>
  );
}
